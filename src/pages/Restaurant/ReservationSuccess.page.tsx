import { Container, Title, Text, Button, Group, Stack, Card, Box, Grid } from '@mantine/core';
import { IconCheck, IconCalendar, IconClock, IconUsers, IconMail } from '@tabler/icons-react';
import { RestaurantLayout } from '../../components/Restaurant/RestaurantLayout';
import { AnimatedSection } from '../../components/Restaurant/AnimatedSection';
import { Link } from 'react-router-dom';

export function RestaurantReservationSuccessPage() {
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
              
              <Text size="lg" c="dimmed" mb="xl">
                Thank you for choosing Caribbean Kitchen. Your reservation has been successfully confirmed.
              </Text>

              <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl" style={{ backgroundColor: '#f8fafc' }}>
                <Title order={3} mb="md" c="green">Reservation Details</Title>
                <Stack gap="sm">
                  <Group>
                    <IconCalendar size={20} color="#059669" />
                    <Text>Date: [Reservation Date]</Text>
                  </Group>
                  <Group>
                    <IconClock size={20} color="#059669" />
                    <Text>Time: [Reservation Time]</Text>
                  </Group>
                  <Group>
                    <IconUsers size={20} color="#059669" />
                    <Text>Party Size: [Party Size] guests</Text>
                  </Group>
                  <Group>
                    <IconMail size={20} color="#059669" />
                    <Text>Confirmation sent to: [Customer Email]</Text>
                  </Group>
                </Stack>
              </Card>

              <Stack gap="md">
                <Text size="md" c="dimmed">
                  A confirmation email has been sent to your email address with all the details. 
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
                <Button 
                  size="lg" 
                  variant="outline" 
                  color="green" 
                  component={Link} 
                  to="/"
                >
                  Make Another Reservation
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
                      We accept all major credit cards and cash. 
                      Service charge of 12.5% is included for parties of 6 or more.
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
