import { Container, Title, Text, Button, Group, Stack, Card, Grid, Box, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconMapPin, IconPhone, IconMail, IconClock, IconUser, IconMessage } from '@tabler/icons-react';
import { RestaurantLayout } from '../../components/Restaurant/RestaurantLayout';
import { AnimatedSection } from '../../components/Restaurant/AnimatedSection';
import { useState } from 'react';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export function RestaurantContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ContactForm>({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      message: (value) => (value.length < 10 ? 'Message must be at least 10 characters' : null),
    },
  });

  const handleSubmit = async (values: ContactForm) => {
    setIsSubmitting(true);
    try {
      // Here you would typically send the contact form data to your API
      console.log('Contact form data:', values);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For now, just show success
      alert('Message sent successfully! We will get back to you within 24 hours.');
      form.reset();
    } catch (error) {
      alert('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RestaurantLayout>
      <Box>
        {/* Hero Section */}
        <AnimatedSection>
          <Box 
            style={{
              background: `linear-gradient(135deg, rgba(5,150,105,0.9) 0%, rgba(52,211,153,0.9) 100%), url('https://images.unsplash.com/photo-1552566651-75494022c5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80') center/cover no-repeat`,
              minHeight: '40vh',
              display: 'flex',
              alignItems: 'center',
              color: 'white',
              textAlign: 'center'
            }}
          >
            <Container size="lg">
              <Title order={1} size="3rem" mb="md" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                Get in Touch
              </Title>
              <Text size="xl" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                We'd love to hear from you. Contact us for reservations, events, or just to say hello!
              </Text>
            </Container>
          </Box>
        </AnimatedSection>

        {/* Contact Information & Form */}
        <AnimatedSection delay={0.15}>
          <Container size="lg" py="xl">
            <Grid>
              {/* Contact Information */}
              <Grid.Col span={{ base: 12, md: 5 }}>
                <Title order={2} mb="xl" c="green">Contact Information</Title>
                <Stack gap="xl">
                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Group mb="md">
                      <IconMapPin size={24} color="#059669" />
                      <Title order={3} size="h4">Location</Title>
                    </Group>
                    <Text c="dimmed">
                      123 Caribbean Street<br/>
                      London, SW1A 1AA<br/>
                      United Kingdom
                    </Text>
                  </Card>

                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Group mb="md">
                      <IconPhone size={24} color="#059669" />
                      <Title order={3} size="h4">Phone</Title>
                    </Group>
                    <Text c="dimmed">
                      Main: +44 20 7123 4567<br/>
                      Reservations: +44 20 7123 4568
                    </Text>
                  </Card>

                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Group mb="md">
                      <IconMail size={24} color="#059669" />
                      <Title order={3} size="h4">Email</Title>
                    </Group>
                    <Text c="dimmed">
                      General: info@caribbeankitchen.co.uk<br/>
                      Reservations: reservations@caribbeankitchen.co.uk<br/>
                      Events: events@caribbeankitchen.co.uk
                    </Text>
                  </Card>

                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Group mb="md">
                      <IconClock size={24} color="#059669" />
                      <Title order={3} size="h4">Opening Hours</Title>
                    </Group>
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
                </Stack>
              </Grid.Col>

              {/* Contact Form */}
              <Grid.Col span={{ base: 12, md: 7 }}>
                <Card shadow="lg" padding="xl" radius="md" withBorder>
                  <Title order={2} mb="xl" c="green">Send us a Message</Title>
                  
                  <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack gap="md">
                      <Grid>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <TextInput
                            label="Full Name"
                            placeholder="Your name"
                            leftSection={<IconUser size={16} />}
                            {...form.getInputProps('name')}
                            required
                          />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <TextInput
                            label="Phone Number"
                            placeholder="Your phone number"
                            leftSection={<IconPhone size={16} />}
                            {...form.getInputProps('phone')}
                          />
                        </Grid.Col>
                      </Grid>

                      <TextInput
                        label="Email"
                        placeholder="your.email@example.com"
                        leftSection={<IconMail size={16} />}
                        {...form.getInputProps('email')}
                        required
                      />

                      <TextInput
                        label="Subject"
                        placeholder="What is this regarding?"
                        leftSection={<IconMessage size={16} />}
                        {...form.getInputProps('subject')}
                      />

                      <Textarea
                        label="Message"
                        placeholder="Tell us how we can help you..."
                        minRows={4}
                        {...form.getInputProps('message')}
                        required
                      />

                      <Button 
                        type="submit" 
                        size="lg" 
                        color="green" 
                        loading={isSubmitting}
                        fullWidth
                        mt="md"
                      >
                        {isSubmitting ? 'Sending Message...' : 'Send Message'}
                      </Button>
                    </Stack>
                  </form>
                </Card>
              </Grid.Col>
            </Grid>
          </Container>
        </AnimatedSection>

        {/* Map Section */}
        <AnimatedSection delay={0.25}>
          <Box style={{ background: '#f8fafc', padding: '60px 0' }}>
            <Container size="lg">
              <Title order={2} ta="center" mb="xl" c="green">Find Us</Title>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Box 
                  style={{ 
                    height: '400px', 
                    background: 'linear-gradient(135deg, #e5f3f0 0%, #a7f3d0 100%)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#059669'
                  }}
                >
                  <Stack gap="md" style={{ textAlign: 'center' }}>
                    <IconMapPin size={48} />
                    <Text size="lg" fw={600}>Interactive Map</Text>
                    <Text c="dimmed">
                      Map integration would be displayed here<br/>
                      (Google Maps, OpenStreetMap, etc.)
                    </Text>
                  </Stack>
                </Box>
              </Card>
            </Container>
          </Box>
        </AnimatedSection>

        {/* Additional Information */}
        <AnimatedSection delay={0.35}>
          <Container size="lg" py="xl">
            <Grid>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: '100%' }}>
                  <Title order={3} mb="md" c="green">Private Events</Title>
                  <Text size="sm" c="dimmed" mb="md">
                    Planning a special event? We offer private dining options for groups of 15-50 people. 
                    Our team can create a customized menu perfect for your celebration.
                  </Text>
                  <Text size="sm" fw={600} c="orange">
                    Contact: events@caribbeankitchen.co.uk
                  </Text>
                </Card>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: '100%' }}>
                  <Title order={3} mb="md" c="green">Catering Services</Title>
                  <Text size="sm" c="dimmed" mb="md">
                    Bring the taste of the Caribbean to your office or event. We offer full catering services 
                    with delivery throughout London.
                  </Text>
                  <Text size="sm" fw={600} c="orange">
                    Minimum order: £150
                  </Text>
                </Card>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: '100%' }}>
                  <Title order={3} mb="md" c="green">Feedback</Title>
                  <Text size="sm" c="dimmed" mb="md">
                    Your feedback helps us improve. Whether it's a compliment or concern, 
                    we want to hear from you.
                  </Text>
                  <Text size="sm" fw={600} c="orange">
                    Response time: Within 24 hours
                  </Text>
                </Card>
              </Grid.Col>
            </Grid>
          </Container>
        </AnimatedSection>
      </Box>
    </RestaurantLayout>
  );
}
