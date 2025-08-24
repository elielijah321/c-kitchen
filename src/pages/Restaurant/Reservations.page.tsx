import { Container, Title, Text, Button, Group, Stack, Card, Grid, Box, TextInput, Textarea, Select, NumberInput } from '@mantine/core';
import { DatePickerInput, TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconCalendar, IconClock, IconUsers, IconUser, IconMail, IconPhone } from '@tabler/icons-react';
import { RestaurantLayout } from '../../components/Restaurant/RestaurantLayout';
import { AnimatedSection } from '../../components/Restaurant/AnimatedSection';
import { useState } from 'react';

interface ReservationForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  date: Date | null;
  time: string;
  partySize: number;
  notes: string;
}

export function RestaurantReservationsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ReservationForm>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      date: null,
      time: '',
      partySize: 2,
      notes: '',
    },
    validate: {
      firstName: (value) => (value.length < 2 ? 'First name must have at least 2 letters' : null),
      lastName: (value) => (value.length < 2 ? 'Last name must have at least 2 letters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      phoneNumber: (value) => (value.length < 10 ? 'Please enter a valid phone number' : null),
      date: (value) => (value ? null : 'Please select a date'),
      time: (value) => (value ? null : 'Please select a time'),
      partySize: (value) => (value >= 1 && value <= 12 ? null : 'Party size must be between 1 and 12'),
    },
  });

  const handleSubmit = async (values: ReservationForm) => {
    setIsSubmitting(true);
    try {
      // Here you would typically send the reservation data to your API
      console.log('Reservation data:', values);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For now, just show success
      alert('Reservation request submitted successfully! We will contact you to confirm.');
      form.reset();
    } catch (error) {
      alert('There was an error submitting your reservation. Please try again.');
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
                  {/* Personal Information */}
                  <Title order={3} size="h4" c="dark">Personal Information</Title>
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
                  
                  <Grid>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TextInput
                        label="Email"
                        placeholder="your.email@example.com"
                        leftSection={<IconMail size={16} />}
                        {...form.getInputProps('email')}
                        required
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TextInput
                        label="Phone Number"
                        placeholder="+44 20 1234 5678"
                        leftSection={<IconPhone size={16} />}
                        {...form.getInputProps('phoneNumber')}
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

                  <Button 
                    type="submit" 
                    size="lg" 
                    color="green" 
                    loading={isSubmitting}
                    fullWidth
                    mt="md"
                  >
                    {isSubmitting ? 'Submitting Reservation...' : 'Make Reservation'}
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
                      • Parties of 6 or more may have an 18% service charge added<br/>
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
