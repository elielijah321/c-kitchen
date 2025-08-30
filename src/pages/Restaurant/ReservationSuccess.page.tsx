import { Container, Title, Text, Button, Group, Stack, Card, Box, Grid, Alert } from '@mantine/core';
import { IconCheck, IconCalendar, IconClock, IconUsers, IconAlertCircle } from '@tabler/icons-react';
import { RestaurantLayout } from '../../components/Restaurant/RestaurantLayout';
import { AnimatedSection } from '../../components/Restaurant/AnimatedSection';
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PaymentService } from '../../services/paymentService';

interface ReservationDetails {
  firstName: string;
  lastName: string;
  reservationType: string;
  reservationTypeLabel: string;
  reservationDate: string;
  reservationTime: string;
  partySize: number;
  notes: string;
  depositAmount: number;
  paymentStatus: string;
  stripeSessionId?: string;
}

export function RestaurantReservationSuccessPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [reservationDetails, setReservationDetails] = useState<ReservationDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Handle Stripe redirect with session_id query parameter
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      // Redirect to clean URL with session ID as route parameter
      navigate(`/success/${sessionId}`, { replace: true });
      return;
    }

    if (!id) {
      setError('Invalid reservation reference. Please contact us if you need assistance.');
      setIsLoading(false);
      return;
    }

    // Check if this is a Stripe session ID (starts with 'cs_')
    if (id.startsWith('cs_')) {
      // Stripe reservation - save from Stripe metadata
      saveReservationFromStripe(id);
    } else {
      // Direct reservation - get data from session storage using the reservation ID
      try {
        const storedDetails = sessionStorage.getItem('reservationDetails');
        if (storedDetails) {
          const details = JSON.parse(storedDetails) as ReservationDetails;
          setReservationDetails(details);
          // Clear the session storage
          sessionStorage.removeItem('reservationDetails');
        } else {
          setError('Reservation details not found. Please contact us if you need assistance.');
        }
      } catch (error) {
        console.error('Failed to parse stored reservation details:', error);
        setError('Failed to load reservation details. Please contact us if you need assistance.');
      }
      setIsLoading(false);
    }
  }, [id, searchParams, navigate]);

  const saveReservationFromStripe = async (sessionId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Call the API to save reservation from Stripe metadata
      const reservationData = {
        stripeSessionId: sessionId
      };

      const saveResult = await PaymentService.saveReservation(reservationData);
      
      if (!saveResult.success) {
        throw new Error(saveResult.errorMessage || 'Failed to save reservation');
      }

      // Set the reservation details from the API response
      if (saveResult.reservationDetails) {
        setReservationDetails(saveResult.reservationDetails);
      } else {
        throw new Error('No reservation details returned from server');
      }
    } catch (error) {
      console.error('Failed to save reservation from Stripe:', error);
      setError(error instanceof Error ? error.message : 'Failed to save reservation details');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RestaurantLayout>
      <Box>
        <AnimatedSection>
          <Container size="md" py="xl">
            <Card shadow="lg" padding="xl" radius="md" withBorder style={{ textAlign: 'center' }}>
              <Box 
                style={{ 
                  backgroundColor: '#22c55e', 
                  borderRadius: '50%', 
                  width: '80px', 
                  height: '80px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto 24px auto'
                }}
              >
                <IconCheck size={40} color="white" />
              </Box>
              
              <Title order={1} mb="md" c="green">
                Reservation Confirmed!
              </Title>
              
              {/* Loading State */}
              {isLoading && (
                <Alert icon={<IconAlertCircle size="1rem" />} title="Processing Reservation" color="blue" mb="xl">
                  Please wait while we process your reservation details...
                </Alert>
              )}

              {/* Error State */}
              {error && !isLoading && (
                <Alert icon={<IconAlertCircle size="1rem" />} title="Processing Error" color="red" mb="xl">
                  {error}. Please call us at +44 20 7123 4567 if you need assistance.
                </Alert>
              )}

              {/* Success State */}
              {reservationDetails && !isLoading && !error && (
                <>
                  <Text size="lg" c="dimmed" mb="xl">
                    Thank you {reservationDetails.firstName} {reservationDetails.lastName} for choosing Caribbean Kitchen. Your {reservationDetails.reservationTypeLabel.toLowerCase()} reservation has been successfully confirmed.
                  </Text>

                  <Alert icon={<IconCheck size="1rem" />} title="Reservation Confirmed" color="green" mb="xl">
                    Your reservation has been successfully saved to our system.
                  </Alert>
                </>
              )}

              {reservationDetails && !isLoading && !error && (
                <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl" style={{ backgroundColor: '#f8fafc' }}>
                  <Title order={3} mb="md" c="green">Reservation Details</Title>
                  <Stack gap="sm">
                    <Group>
                      <IconCalendar size={20} color="#059669" />
                      <Text><strong>Reservation Type:</strong> {reservationDetails.reservationTypeLabel}</Text>
                    </Group>
                    <Group>
                      <IconCalendar size={20} color="#059669" />
                      <Text><strong>Date:</strong> {reservationDetails.reservationDate}</Text>
                    </Group>
                    <Group>
                      <IconClock size={20} color="#059669" />
                      <Text><strong>Time:</strong> {reservationDetails.reservationTime}</Text>
                    </Group>
                    <Group>
                      <IconUsers size={20} color="#059669" />
                      <Text><strong>Party Size:</strong> {reservationDetails.partySize} guests</Text>
                    </Group>
                    {reservationDetails.depositAmount > 0 && (
                      <Group>
                        <IconCheck size={20} color="#059669" />
                        <Text><strong>Deposit Paid:</strong> £{(reservationDetails.depositAmount / 100).toFixed(2)}</Text>
                      </Group>
                    )}
                    {reservationDetails.notes && (
                      <Group>
                        <IconCheck size={20} color="#059669" />
                        <Text><strong>Special Requests:</strong> {reservationDetails.notes}</Text>
                      </Group>
                    )}
                  </Stack>
                </Card>
              )}

              <Stack gap="md">
                <Text size="md" c="dimmed">
                  Please arrive 10-15 minutes before your reservation time.
                </Text>
                
                <Text size="sm" c="dimmed">
                  If you need to modify or cancel your reservation, please call us at +44 20 7123 4567 
                  at least 24 hours in advance.
                </Text>
              </Stack>

              <Group justify="center" gap="md" mt="xl">
                <Button 
                  size="lg" 
                  variant="filled" 
                  color="green" 
                  component={Link} 
                  to="/"
                >
                  Return Home
                </Button>
              </Group>
            </Card>
          </Container>
        </AnimatedSection>

        {/* What to Expect Section */}
        <AnimatedSection delay={0.15}>
          <Box style={{ background: '#f8fafc', padding: '60px 0' }}>
            <Container size="lg">
              <Title order={2} ta="center" mb="xl" c="green">
                What to Expect
              </Title>
              <Grid gutter="xl">
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: '100%', textAlign: 'center' }}>
                    <Title order={3} mb="md">Arrival</Title>
                    <Text size="sm" c="dimmed">
                      Please arrive 10-15 minutes before your reservation time. 
                      Our host will greet you and show you to your table.
                    </Text>
                  </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: '100%', textAlign: 'center' }}>
                    <Title order={3} mb="md">Dining Experience</Title>
                    <Text size="sm" c="dimmed">
                      Enjoy authentic Caribbean cuisine prepared fresh to order. 
                      Our staff will be happy to recommend dishes and accommodate dietary needs.
                    </Text>
                  </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: '100%', textAlign: 'center' }}>
                    <Title order={3} mb="md">Payment</Title>
                    <Text size="sm" c="dimmed">
                      We accept all major credit/debit cards and cash. 
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
