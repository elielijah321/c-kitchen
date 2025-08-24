import { Container, Title, Text, Group, Stack, Card, Grid, Image, Box } from '@mantine/core';
import { IconHeart, IconUsers, IconAward, IconClock } from '@tabler/icons-react';
import { RestaurantLayout } from '../../components/Restaurant/RestaurantLayout';
import { AnimatedSection } from '../../components/Restaurant/AnimatedSection';

export function RestaurantAboutPage() {
  return (
    <RestaurantLayout>
      <Box>
        {/* Hero Section */}
        <AnimatedSection>
          <Box 
            style={{
              background: `linear-gradient(135deg, rgba(5,150,105,0.9) 0%, rgba(52,211,153,0.9) 100%), url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80') center/cover no-repeat`,
              minHeight: '50vh',
              display: 'flex',
              alignItems: 'center',
              color: 'white',
              textAlign: 'center'
            }}
          >
            <Container size="lg">
              <Title order={1} size="3rem" mb="md" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                Our Story
              </Title>
              <Text size="xl" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                Bringing authentic Caribbean flavors to London since 2015
              </Text>
            </Container>
          </Box>
        </AnimatedSection>

        {/* Our Story */}
        <AnimatedSection delay={0.15}>
          <Container size="lg" py="xl">
            <Grid align="center">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Title order={2} mb="xl" c="green">The Caribbean Kitchen Story</Title>
                <Stack gap="md">
                  <Text size="lg" c="dimmed">
                    Caribbean Kitchen was born from a dream to share the vibrant, soul-warming flavors of the Caribbean 
                    with the London community. Founded by Chef Maria Thompson, who grew up in Kingston, Jamaica, 
                    our restaurant is a celebration of authentic Caribbean cuisine and culture.
                  </Text>
                  <Text size="md" c="dimmed">
                    After moving to London in 2010, Maria found herself missing the authentic taste of home. 
                    She realized that many Caribbean restaurants in London had adapted their recipes for local tastes, 
                    losing the genuine flavors that make Caribbean food so special.
                  </Text>
                  <Text size="md" c="dimmed">
                    Determined to bring real Caribbean cooking to London, Maria opened Caribbean Kitchen in 2015 
                    with a simple mission: to serve authentic dishes using traditional recipes passed down through 
                    generations, prepared with the finest ingredients and genuine Caribbean love.
                  </Text>
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Image
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Chef Maria cooking"
                  radius="md"
                />
              </Grid.Col>
            </Grid>
          </Container>
        </AnimatedSection>

        {/* Our Values */}
        <AnimatedSection delay={0.25}>
          <Box style={{ background: '#f8fafc', padding: '80px 0' }}>
            <Container size="lg">
              <Title order={2} ta="center" mb="xl" size="2.5rem" c="green">
                Our Values
              </Title>
              <Grid>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: '100%', textAlign: 'center' }}>
                    <IconHeart size={48} color="#059669" style={{ margin: '0 auto 16px' }} />
                    <Title order={3} mb="md">Authenticity</Title>
                    <Text size="sm" c="dimmed">
                      We stay true to traditional Caribbean recipes, using authentic ingredients and cooking methods 
                      to deliver genuine flavors.
                    </Text>
                  </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: '100%', textAlign: 'center' }}>
                    <IconUsers size={48} color="#059669" style={{ margin: '0 auto 16px' }} />
                    <Title order={3} mb="md">Community</Title>
                    <Text size="sm" c="dimmed">
                      We believe food brings people together. Our restaurant is a welcoming space for everyone 
                      to experience Caribbean culture.
                    </Text>
                  </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: '100%', textAlign: 'center' }}>
                    <IconAward size={48} color="#059669" style={{ margin: '0 auto 16px' }} />
                    <Title order={3} mb="md">Quality</Title>
                    <Text size="sm" c="dimmed">
                      We source the finest ingredients and never compromise on quality. Every dish is prepared 
                      with care and attention to detail.
                    </Text>
                  </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: '100%', textAlign: 'center' }}>
                    <IconClock size={48} color="#059669" style={{ margin: '0 auto 16px' }} />
                    <Title order={3} mb="md">Tradition</Title>
                    <Text size="sm" c="dimmed">
                      Our recipes have been passed down through generations. We honor these traditions while 
                      creating new memories.
                    </Text>
                  </Card>
                </Grid.Col>
              </Grid>
            </Container>
          </Box>
        </AnimatedSection>

        {/* Meet the Team */}
        <AnimatedSection delay={0.35}>
          <Container size="lg" py="xl">
            <Title order={2} ta="center" mb="xl" size="2.5rem" c="green">
              Meet Our Team
            </Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder style={{ textAlign: 'center' }}>
                  <Card.Section>
                    <Image
                      src="https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                      height={200}
                      alt="Chef Maria Thompson"
                    />
                  </Card.Section>
                  <Title order={3} mt="md" mb="xs">Maria Thompson</Title>
                  <Text size="sm" c="orange" fw={600} mb="sm">Head Chef & Owner</Text>
                  <Text size="sm" c="dimmed">
                    Born in Kingston, Jamaica, Maria brings over 20 years of culinary experience and a passion 
                    for authentic Caribbean cuisine to every dish.
                  </Text>
                </Card>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder style={{ textAlign: 'center' }}>
                  <Card.Section>
                    <Image
                      src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                      height={200}
                      alt="Marcus Johnson"
                    />
                  </Card.Section>
                  <Title order={3} mt="md" mb="xs">Marcus Johnson</Title>
                  <Text size="sm" c="orange" fw={600} mb="sm">Sous Chef</Text>
                  <Text size="sm" c="dimmed">
                    Originally from Barbados, Marcus specializes in seafood dishes and brings his own island 
                    flair to our menu.
                  </Text>
                </Card>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder style={{ textAlign: 'center' }}>
                  <Card.Section>
                    <Image
                      src="https://images.unsplash.com/photo-1594824172020-d98c81c69f49?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                      height={200}
                      alt="Grace Williams"
                    />
                  </Card.Section>
                  <Title order={3} mt="md" mb="xs">Grace Williams</Title>
                  <Text size="sm" c="orange" fw={600} mb="sm">Restaurant Manager</Text>
                  <Text size="sm" c="dimmed">
                    Grace ensures every guest feels at home with her warm hospitality and extensive knowledge 
                    of Caribbean culture.
                  </Text>
                </Card>
              </Grid.Col>
            </Grid>
          </Container>
        </AnimatedSection>

        {/* Awards & Recognition */}
        <AnimatedSection delay={0.45}>
          <Box style={{ background: 'linear-gradient(135deg, #059669 0%, #34d399 100%)', padding: '80px 0', color: 'white' }}>
            <Container size="lg">
              <Title order={2} ta="center" mb="xl" size="2.5rem">
                Awards & Recognition
              </Title>
              <Grid>
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <Box style={{ textAlign: 'center' }}>
                    <Title order={1} size="3rem" mb="xs">2023</Title>
                    <Text fw={600} mb="sm">Best Caribbean Restaurant</Text>
                    <Text size="sm" style={{ color: 'rgba(255,255,255,0.8)' }}>London Food Awards</Text>
                  </Box>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <Box style={{ textAlign: 'center' }}>
                    <Title order={1} size="3rem" mb="xs">2022</Title>
                    <Text fw={600} mb="sm">People's Choice Award</Text>
                    <Text size="sm" style={{ color: 'rgba(255,255,255,0.8)' }}>TripAdvisor Travelers' Choice</Text>
                  </Box>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <Box style={{ textAlign: 'center' }}>
                    <Title order={1} size="3rem" mb="xs">2021</Title>
                    <Text fw={600} mb="sm">Excellence in Service</Text>
                    <Text size="sm" style={{ color: 'rgba(255,255,255,0.8)' }}>London Restaurant Guide</Text>
                  </Box>
                </Grid.Col>
              </Grid>
            </Container>
          </Box>
        </AnimatedSection>

        {/* Visit Us */}
        <AnimatedSection delay={0.55}>
          <Container size="lg" py="xl">
            <Card shadow="lg" padding="xl" radius="md" withBorder>
              <Title order={2} ta="center" mb="md" c="green">
                Visit Caribbean Kitchen
              </Title>
              <Text ta="center" size="lg" c="dimmed" mb="xl">
                Come and experience the warmth of Caribbean hospitality and the authentic flavors that have made us 
                London's favorite Caribbean restaurant.
              </Text>
              <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Stack gap="sm">
                    <Text fw={600}>Address:</Text>
                    <Text c="dimmed">123 Caribbean Street<br/>London, SW1A 1AA</Text>
                    
                    <Text fw={600} mt="md">Phone:</Text>
                    <Text c="dimmed">+44 20 7123 4567</Text>
                    
                    <Text fw={600} mt="md">Email:</Text>
                    <Text c="dimmed">info@caribbeankitchen.co.uk</Text>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Text fw={600} mb="sm">Opening Hours:</Text>
                  <Stack gap="xs">
                    <Group justify="space-between">
                      <Text>Monday - Thursday</Text>
                      <Text>11:00 AM - 10:00 PM</Text>
                    </Group>
                    <Group justify="space-between">
                      <Text>Friday - Saturday</Text>
                      <Text>11:00 AM - 11:00 PM</Text>
                    </Group>
                    <Group justify="space-between">
                      <Text>Sunday</Text>
                      <Text>12:00 PM - 9:00 PM</Text>
                    </Group>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Card>
          </Container>
        </AnimatedSection>
      </Box>
    </RestaurantLayout>
  );
}
