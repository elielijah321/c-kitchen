import { Container, Title, Text, Button, Group, Stack, Card, Grid, Image, Box, Badge } from '@mantine/core';
import { IconChefHat, IconClock, IconMapPin, IconPhone, IconStar, IconCheck } from '@tabler/icons-react';
import { RestaurantLayout } from '../../components/Restaurant/RestaurantLayout';
import { Link } from 'react-router-dom';
import { AnimatedSection } from '../../components/Restaurant/AnimatedSection';
import './Home.page.css';

export function RestaurantHomePage() {
  return (
    <RestaurantLayout>
      <Box>
        {/* Hero Section */}
        <AnimatedSection>
          <Box 
            className="hero-section"
            style={{
              background: `linear-gradient(135deg, rgba(5,150,105,0.8) 0%, rgba(52,211,153,0.8) 100%), url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2187&q=80') center/cover no-repeat`,
              minHeight: '80vh',
              display: 'flex',
              alignItems: 'center',
              color: 'white',
              textAlign: 'center'
            }}
          >
            <Container size="lg">
              <Title order={1} size="3.5rem" mb="md" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                Authentic Caribbean Cuisine
              </Title>
              <Text size="xl" mb="xl" style={{ maxWidth: '800px', margin: '0 auto 2rem auto', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                Experience the vibrant flavors of the Caribbean at Caribbean Kitchen. From jerk chicken to fresh seafood, 
                we bring the islands to your table with every dish.
              </Text>
              <Group justify="center" gap="md">
                <Button size="lg" variant="filled" color="orange" component={Link} to="/reservations">
                  Make Reservation
                </Button>
                <Button size="lg" variant="outline" color="white" component={Link} to="/menu">
                  View Menu
                </Button>
              </Group>
            </Container>
          </Box>
        </AnimatedSection>

        {/* Restaurant Info */}
        <AnimatedSection delay={0.15}>
          <Box style={{ background: '#f8fafc', padding: '80px 0' }}>
            <Container size="lg">
              <Title order={2} ta="center" mb="xl" size="2.5rem" c="dark">
                Why Choose Caribbean Kitchen?
              </Title>
              <Grid>
                <Grid.Col span={{ base: 6, md: 3 }}>
                  <Box style={{ textAlign: 'center', padding: '20px' }}>
                    <IconChefHat size={48} color="#059669" style={{ margin: '0 auto 16px' }} />
                    <Title order={3} size="1.5rem" mb="xs" c="dark">Authentic Recipes</Title>
                    <Text size="md" c="dimmed">Traditional Caribbean recipes passed down through generations</Text>
                  </Box>
                </Grid.Col>
                <Grid.Col span={{ base: 6, md: 3 }}>
                  <Box style={{ textAlign: 'center', padding: '20px' }}>
                    <IconStar size={48} color="#059669" style={{ margin: '0 auto 16px' }} />
                    <Title order={3} size="1.5rem" mb="xs" c="dark">Fresh Ingredients</Title>
                    <Text size="md" c="dimmed">Only the finest and freshest ingredients in every dish</Text>
                  </Box>
                </Grid.Col>
                <Grid.Col span={{ base: 6, md: 3 }}>
                  <Box style={{ textAlign: 'center', padding: '20px' }}>
                    <IconClock size={48} color="#059669" style={{ margin: '0 auto 16px' }} />
                    <Title order={3} size="1.5rem" mb="xs" c="dark">Quick Service</Title>
                    <Text size="md" c="dimmed">Fast, friendly service without compromising quality</Text>
                  </Box>
                </Grid.Col>
                <Grid.Col span={{ base: 6, md: 3 }}>
                  <Box style={{ textAlign: 'center', padding: '20px' }}>
                    <IconMapPin size={48} color="#059669" style={{ margin: '0 auto 16px' }} />
                    <Title order={3} size="1.5rem" mb="xs" c="dark">Great Location</Title>
                    <Text size="md" c="dimmed">Conveniently located in the heart of the city</Text>
                  </Box>
                </Grid.Col>
              </Grid>
            </Container>
          </Box>
        </AnimatedSection>

        {/* Featured Dishes */}
        <AnimatedSection delay={0.25}>
          <Container size="lg" py="xl">
            <Title order={2} ta="center" mb="xl" size="2.5rem">
              Our Signature Dishes
            </Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder className="dish-card" style={{ height: '100%' }}>
                  <Card.Section>
                    <Image
                      src="https://images.unsplash.com/photo-1598514983318-2f64c8e3d3cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                      height={200}
                      alt="Jerk Chicken"
                    />
                  </Card.Section>
                  <Group justify="space-between" mt="md" mb="xs">
                    <Title order={3}>Jerk Chicken</Title>
                    <Badge color="orange" variant="light">Spicy</Badge>
                  </Group>
                  <Text size="sm" c="dimmed" mb="md">
                    Our signature jerk chicken marinated in authentic spices and grilled to perfection. 
                    Served with rice and peas and festival bread.
                  </Text>
                  <Text fw={600} size="lg" c="orange">£18.99</Text>
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder className="dish-card" style={{ height: '100%' }}>
                  <Card.Section>
                    <Image
                      src="https://images.unsplash.com/photo-1563379091339-03246963d12b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                      height={200}
                      alt="Curry Goat"
                    />
                  </Card.Section>
                  <Group justify="space-between" mt="md" mb="xs">
                    <Title order={3}>Curry Goat</Title>
                    <Badge color="green" variant="light">Traditional</Badge>
                  </Group>
                  <Text size="sm" c="dimmed" mb="md">
                    Tender goat meat slow-cooked in aromatic Caribbean curry spices. 
                    A true taste of the islands served with white rice.
                  </Text>
                  <Text fw={600} size="lg" c="orange">£22.99</Text>
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder className="dish-card" style={{ height: '100%' }}>
                  <Card.Section>
                    <Image
                      src="https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                      height={200}
                      alt="Ackee and Saltfish"
                    />
                  </Card.Section>
                  <Group justify="space-between" mt="md" mb="xs">
                    <Title order={3}>Ackee & Saltfish</Title>
                    <Badge color="blue" variant="light">National Dish</Badge>
                  </Group>
                  <Text size="sm" c="dimmed" mb="md">
                    Jamaica's national dish featuring ackee fruit and salted cod, 
                    perfectly seasoned and served with fried plantain.
                  </Text>
                  <Text fw={600} size="lg" c="orange">£16.99</Text>
                </Card>
              </Grid.Col>
            </Grid>
            <Group justify="center" mt="xl">
              <Button size="lg" variant="outline" color="green" component={Link} to="/menu">
                View Full Menu
              </Button>
            </Group>
          </Container>
        </AnimatedSection>

        {/* Testimonials */}
        <AnimatedSection delay={0.35}>
          <Box style={{ background: 'linear-gradient(135deg, #059669 0%, #34d399 100%)', padding: '80px 0', color: 'white' }}>
            <Container size="lg">
              <Title order={2} ta="center" mb="xl" size="2.5rem">
                What Our Customers Say
              </Title>
              <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Card shadow="sm" padding="lg" radius="md" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                    <Text size="lg" mb="md" style={{ fontStyle: 'italic', color: 'white' }}>
                      "The most authentic Caribbean food I've had outside of Jamaica! The jerk chicken is absolutely incredible, 
                      and the atmosphere makes you feel like you're dining in the islands."
                    </Text>
                    <Group>
                      <Box>
                        <Text fw={700} size="lg" c="white">Sarah Johnson</Text>
                        <Text size="sm" style={{ color: 'rgba(255,255,255,0.8)' }}>Food Blogger</Text>
                      </Box>
                    </Group>
                  </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Card shadow="sm" padding="lg" radius="md" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                    <Text size="lg" mb="md" style={{ fontStyle: 'italic', color: 'white' }}>
                      "Caribbean Kitchen has become our family's go-to restaurant. The curry goat reminds me of my grandmother's cooking, 
                      and the staff always makes us feel welcome."
                    </Text>
                    <Group>
                      <Box>
                        <Text fw={700} size="lg" c="white">Marcus Thompson</Text>
                        <Text size="sm" style={{ color: 'rgba(255,255,255,0.8)' }}>Regular Customer</Text>
                      </Box>
                    </Group>
                  </Card>
                </Grid.Col>
              </Grid>
            </Container>
          </Box>
        </AnimatedSection>

        {/* Restaurant Hours & Contact */}
        <AnimatedSection delay={0.45}>
          <Container size="lg" py="xl">
            <Title order={2} ta="center" mb="xl" size="2.5rem">
              Visit Us Today
            </Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Title order={3} mb="md" c="green">Opening Hours</Title>
                  <Stack gap="xs">
                    <Group justify="space-between">
                      <Text>Monday - Thursday</Text>
                      <Text fw={600}>11:00 AM - 10:00 PM</Text>
                    </Group>
                    <Group justify="space-between">
                      <Text>Friday - Saturday</Text>
                      <Text fw={600}>11:00 AM - 11:00 PM</Text>
                    </Group>
                    <Group justify="space-between">
                      <Text>Sunday</Text>
                      <Text fw={600}>12:00 PM - 9:00 PM</Text>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Title order={3} mb="md" c="green">Contact Information</Title>
                  <Stack gap="sm">
                    <Group>
                      <IconMapPin size={20} color="#059669" />
                      <Text>123 Caribbean Street, London, SW1A 1AA</Text>
                    </Group>
                    <Group>
                      <IconPhone size={20} color="#059669" />
                      <Text>+44 20 7123 4567</Text>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Container>
        </AnimatedSection>

        {/* CTA Section */}
        <Container size="lg" py="xl">
          <Box style={{ 
            textAlign: 'center', 
            background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
            padding: '60px 40px',
            borderRadius: '12px',
            color: 'white'
          }}>
            <Title order={2} mb="md">
              Ready to Experience Authentic Caribbean Flavors?
            </Title>
            <Text size="lg" mb="xl">
              Book your table today and let us take you on a culinary journey to the Caribbean.
            </Text>
            <Group justify="center" gap="md">
              <Button size="lg" variant="white" color="orange" component={Link} to="/reservations">
                Make Reservation
              </Button>
            </Group>
          </Box>
        </Container>
      </Box>
    </RestaurantLayout>
  );
}
