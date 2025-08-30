import { Container, Title, Text, Button, Group, Stack, Card, Grid, Box, TextInput, Textarea, Select, NumberInput, Alert, Paper } from '@mantine/core';
import { DatePickerInput, TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconCalendar, IconClock, IconUsers, IconUser, IconCreditCard, IconAlertCircle, IconInfoCircle } from '@tabler/icons-react';
import { RestaurantLayout } from '../../components/Restaurant/RestaurantLayout';
import { AnimatedSection } from '../../components/Restaurant/AnimatedSection';
import { useState } from 'react';
import { PaymentService } from '../../services/paymentService';

interface ReservationForm {
  firstName: string;
  lastName: string;
  reservationType: string;
  date: Date | null;
  time: string;
  partySize: number;
  notes: string;
}

const reservationTypes = [
  {
    value: 'regular',
    label: 'Regular Dining',
    description: 'No deposit required',
    depositPerPerson: 0,
  },
  {
    value: 'ayce',
    label: 'All You Can Eat (AYCE)',
    description: '£5 per person deposit',
    depositPerPerson: 500, // £5 in pence
  },
  {
    value: 'christmas',
    label: 'Christmas Menu (inc Christmas Day)',
    description: '£8 per person deposit',
    depositPerPerson: 800, // £8 in pence
  },
];

export function RestaurantReservationsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reservationFee, setReservationFee] = useState(0); // Default fee for regular dining
  
  const form = useForm<ReservationForm>({
    initialValues: {
      firstName: '',
      lastName: '',
      reservationType: 'regular',
      date: null,
      time: '',
      partySize: 2,
      notes: '',
    },
    validate: {
      firstName: (value) => (value.length < 2 ? 'First name must have at least 2 letters' : null),
      lastName: (value) => (value.length < 2 ? 'Last name must have at least 2 letters' : null),
      reservationType: (value) => (value ? null : 'Please select a reservation type'),
      date: (value) => (value ? null : 'Please select a date'),
      time: (value) => (value ? null : 'Please select a time'),
      partySize: (value) => (value >= 1 && value <= 12 ? null : 'Party size must be between 1 and 12'),
    },
  });

  // Calculate reservation fee based on type and party size
  const calculateReservationFee = (reservationType: string, partySize: number) => {
    const selectedType = reservationTypes.find(type => type.value === reservationType);
    if (!selectedType) return 0;
    return selectedType.depositPerPerson * partySize;
  };

  // Update reservation fee when party size changes
  const handlePartySizeChange = (value: string | number) => {
    const partySize = typeof value === 'string' ? parseInt(value) || 2 : value;
    form.setFieldValue('partySize', partySize);
    setReservationFee(calculateReservationFee(form.values.reservationType, partySize));
  };

  // Update reservation fee when reservation type changes
  const handleReservationTypeChange = (value: string | null) => {
    if (value) {
      form.setFieldValue('reservationType', value);
      setReservationFee(calculateReservationFee(value, form.values.partySize));
    }
  };

  const handleSubmit = async (values: ReservationForm) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Format the date for display
      const formattedDate = values.date?.toLocaleDateString('en-GB') || '';
      
      // Get reservation type details
      const selectedReservationType = reservationTypes.find(type => type.value === values.reservationType);
      const reservationTypeLabel = selectedReservationType?.label || 'Regular Dining';

      // If no deposit required, save reservation directly and go to success page
      if (reservationFee === 0) {
        const reservationData = {
          firstName: values.firstName,
          lastName: values.lastName,
          reservationType: values.reservationType,
          reservationDate: formattedDate,
          reservationTime: values.time,
          partySize: values.partySize,
          notes: values.notes || '',
          depositAmount: 0
        };

        const saveResult = await PaymentService.saveReservation(reservationData);
        
        if (!saveResult.success) {
          throw new Error(saveResult.errorMessage || 'Failed to save reservation');
        }

        // Store reservation details temporarily and redirect
        if (saveResult.reservationDetails) {
          sessionStorage.setItem('reservationDetails', JSON.stringify(saveResult.reservationDetails));
        }
        window.location.href = `${window.location.origin}/success/${saveResult.reservationId}`;
        return;
      }

      // Create payment request for deposits
      const paymentRequest = {
        productName: `${reservationTypeLabel} Deposit - ${values.firstName} ${values.lastName}`,
        amountInPence: reservationFee,
        quantity: 1,
        currency: 'GBP',
        successUrl: `${window.location.origin}/success`,
        cancelUrl: window.location.href,
        metadata: {
          firstName: values.firstName,
          lastName: values.lastName,
          reservationType: values.reservationType,
          reservationTypeLabel: reservationTypeLabel,
          reservationDate: formattedDate,
          reservationTime: values.time,
          partySize: values.partySize.toString(),
          notes: values.notes || '',
          bookingType: 'restaurant_reservation'
        }
      };



      // Create Stripe checkout session
      const paymentResponse = await PaymentService.createPaymentSession(paymentRequest);


      if (paymentResponse.success && paymentResponse.checkoutUrl) {
        // Redirect to Stripe checkout
        PaymentService.redirectToCheckout(paymentResponse.checkoutUrl);
      } else {
        throw new Error(paymentResponse.errorMessage || 'Failed to create payment session');
      }
    } catch (error) {
      console.error('Reservation submission error:', error);
      setError(error instanceof Error ? error.message : 'There was an error processing your reservation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const timeSlots = [
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
    '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'
  ];

  return (
    <RestaurantLayout>
      <Box>
        {/* Hero Section */}
        <AnimatedSection>
          <Box 
            style={{
              background: `linear-gradient(135deg, rgba(5,150,105,0.9) 0%, rgba(52,211,153,0.9) 100%), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80') center/cover no-repeat`,
              minHeight: '40vh',
              display: 'flex',
              alignItems: 'center',
              color: 'white',
              textAlign: 'center'
            }}
          >
            <Container size="lg">
              <Title order={1} size="3rem" mb="md" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                Make a Reservation
              </Title>
              <Text size="xl" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                Secure your table and get ready for an unforgettable Caribbean dining experience
              </Text>
            </Container>
          </Box>
        </AnimatedSection>

        {/* Reservation Form */}
        <AnimatedSection delay={0.15}>
          <Container size="md" py="xl">
            <Card shadow="lg" padding="xl" radius="md" withBorder>
              <Title order={2} ta="center" mb="xl" c="green">
                Book Your Table
              </Title>
              
              <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap="md">
                  {/* Reservation Type */}
                  <Title order={3} size="h4" c="dark">Reservation Type</Title>
                  <Select
                    label="Select Reservation Type"
                    placeholder="Choose your reservation type"
                    data={reservationTypes.map(type => ({
                      value: type.value,
                      label: `${type.label} - ${type.description}`
                    }))}
                    value={form.values.reservationType}
                    onChange={handleReservationTypeChange}
                    required
                  />

                  {/* Personal Information */}
                  <Title order={3} size="h4" c="dark" mt="md">Personal Information</Title>
                  <Grid>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TextInput
                        label="First Name"
                        placeholder="Enter your first name"
                        leftSection={<IconUser size={16} />}
                        {...form.getInputProps('firstName')}
                        required
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TextInput
                        label="Last Name"
                        placeholder="Enter your last name"
                        leftSection={<IconUser size={16} />}
                        {...form.getInputProps('lastName')}
                        required
                      />
                    </Grid.Col>
                  </Grid>


                  {/* Reservation Details */}
                  <Title order={3} size="h4" c="dark" mt="md">Reservation Details</Title>
                  <Grid>
                    <Grid.Col span={{ base: 12, md: 4 }}>
                      <DatePickerInput
                        label="Date"
                        placeholder="Select date"
                        leftSection={<IconCalendar size={16} />}
                        minDate={new Date()}
                        maxDate={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)} // 90 days from now
                        {...form.getInputProps('date')}
                        required
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 4 }}>
                      <Select
                        label="Time"
                        placeholder="Select time"
                        leftSection={<IconClock size={16} />}
                        data={timeSlots}
                        {...form.getInputProps('time')}
                        required
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 4 }}>
                      <NumberInput
                        label="Party Size"
                        placeholder="Number of guests"
                        leftSection={<IconUsers size={16} />}
                        min={1}
                        max={12}
                        {...form.getInputProps('partySize')}
                        onChange={handlePartySizeChange}
                        required
                      />
                    </Grid.Col>
                  </Grid>

                  <Textarea
                    label="Special Requests"
                    placeholder="Any special requests, dietary requirements, or occasions we should know about?"
                    minRows={3}
                    {...form.getInputProps('notes')}
                  />

                  {/* Reservation Fee Display */}
                  <Paper withBorder p="md" style={{ backgroundColor: '#f0fdf4' }}>
                    <Group justify="space-between" align="center">
                      <Group>
                        <IconInfoCircle size={20} color="#059669" />
                        <Text size="sm" fw={500}>
                          {reservationFee > 0 ? 'Deposit Required' : 'No Deposit Required'}
                        </Text>
                      </Group>
                      <Text size="lg" fw={600} c="green">
                        {PaymentService.formatAmount(reservationFee)}
                      </Text>
                    </Group>
                    <Text size="xs" c="dimmed" mt="xs">
                      {(() => {
                        const selectedType = reservationTypes.find(type => type.value === form.values.reservationType);
                        if (!selectedType || selectedType.depositPerPerson === 0) {
                          return 'No deposit required for regular dining reservations.';
                        }
                        return `${selectedType.description} (${form.values.partySize} guests). Deposits are fully refundable with 24h notice.`;
                      })()}
                    </Text>
                  </Paper>

                  {/* Error Alert */}
                  {error && (
                    <Alert icon={<IconAlertCircle size="1rem" />} title="Payment Error" color="red">
                      {error}
                    </Alert>
                  )}

                  <Button 
                    type="submit" 
                    size="lg" 
                    color="green" 
                    loading={isSubmitting}
                    fullWidth
                    mt="md"
                    leftSection={reservationFee > 0 ? <IconCreditCard size={20} /> : <IconCalendar size={20} />}
                  >
                    {isSubmitting 
                      ? (reservationFee > 0 ? 'Processing Payment...' : 'Confirming Reservation...') 
                      : (reservationFee > 0 
                          ? `Pay ${PaymentService.formatAmount(reservationFee)} Deposit & Reserve Table` 
                          : 'Confirm Reservation (No Deposit Required)'
                        )
                    }
                  </Button>
                </Stack>
              </form>
            </Card>
          </Container>
        </AnimatedSection>

        {/* Information Section */}
        <AnimatedSection delay={0.25}>
          <Box style={{ background: '#f8fafc', padding: '60px 0' }}>
            <Container size="lg">
              <Grid>
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: '100%' }}>
                    <Title order={3} mb="md" c="green">Reservation Policy</Title>
                    <Text size="sm" c="dimmed">
                      • Reservations are held for 15 minutes past the reserved time<br/>
                      • We require 24 hours notice for cancellations<br/>
                      • Special dietary requirements can be accommodated with advance notice
                    </Text>
                  </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: '100%' }}>
                    <Title order={3} mb="md" c="green">Contact Us</Title>
                    <Text size="sm" c="dimmed">
                      Phone: +44 20 7123 4567<br/>
                      Email: reservations@caribbeankitchen.co.uk<br/>
                      Address: 123 Caribbean Street<br/>
                      London, SW1A 1AA
                    </Text>
                  </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: '100%' }}>
                    <Title order={3} mb="md" c="green">Opening Hours</Title>
                    <Text size="sm" c="dimmed">
                      Monday - Thursday: 11:00 AM - 10:00 PM<br/>
                      Friday - Saturday: 11:00 AM - 11:00 PM<br/>
                      Sunday: 12:00 PM - 9:00 PM<br/>
                      Kitchen closes 30 minutes before closing time
                    </Text>
                  </Card>
                </Grid.Col>
              </Grid>
            </Container>
          </Box>
        </AnimatedSection>
      </Box>
    </RestaurantLayout>
  );
}
