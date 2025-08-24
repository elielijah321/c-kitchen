import { Container, Title, Text, Group, Stack, Card, Grid, Image, Box, Badge, Tabs } from '@mantine/core';
import { IconFlame, IconLeaf, IconFish, IconMeat } from '@tabler/icons-react';
import { RestaurantLayout } from '../../components/Restaurant/RestaurantLayout';
import { AnimatedSection } from '../../components/Restaurant/AnimatedSection';

const starters = [
  {
    name: "Jamaican Patties",
    description: "Flaky pastry filled with spiced beef, chicken, or vegetables",
    price: "£5.99",
    spicy: false,
    vegetarian: true
  },
  {
    name: "Saltfish Fritters",
    description: "Deep-fried balls of salted cod mixed with herbs and spices",
    price: "£7.99",
    spicy: true,
    vegetarian: false
  },
  {
    name: "Plantain Chips",
    description: "Crispy fried plantain slices served with spicy mayo",
    price: "£4.99",
    spicy: false,
    vegetarian: true
  },
  {
    name: "Pepper Shrimp",
    description: "Spicy shrimp sautéed with scotch bonnet peppers",
    price: "£8.99",
    spicy: true,
    vegetarian: false
  }
];

const mains = [
  {
    name: "Jerk Chicken",
    description: "Marinated chicken grilled with traditional jerk spices, served with rice and peas",
    price: "£18.99",
    spicy: true,
    vegetarian: false
  },
  {
    name: "Curry Goat",
    description: "Tender goat meat slow-cooked in aromatic curry spices, served with white rice",
    price: "£22.99",
    spicy: true,
    vegetarian: false
  },
  {
    name: "Ackee and Saltfish",
    description: "Jamaica's national dish with ackee fruit and salted cod, served with fried plantain",
    price: "£16.99",
    spicy: false,
    vegetarian: false
  },
  {
    name: "Brown Stew Fish",
    description: "Whole fish stewed in a rich brown sauce with vegetables",
    price: "£19.99",
    spicy: false,
    vegetarian: false
  },
  {
    name: "Oxtail and Butter Beans",
    description: "Slow-braised oxtail with butter beans in rich gravy",
    price: "£24.99",
    spicy: false,
    vegetarian: false
  },
  {
    name: "Vegetarian Curry",
    description: "Mixed vegetables and chickpeas in coconut curry sauce",
    price: "£14.99",
    spicy: true,
    vegetarian: true
  }
];

const sides = [
  {
    name: "Rice and Peas",
    description: "Coconut rice cooked with kidney beans",
    price: "£4.99",
    spicy: false,
    vegetarian: true
  },
  {
    name: "Festival",
    description: "Sweet fried cornmeal dumplings",
    price: "£3.99",
    spicy: false,
    vegetarian: true
  },
  {
    name: "Fried Plantain",
    description: "Sweet caramelized plantain slices",
    price: "£3.99",
    spicy: false,
    vegetarian: true
  },
  {
    name: "Bammy",
    description: "Traditional cassava flatbread",
    price: "£3.49",
    spicy: false,
    vegetarian: true
  }
];

const desserts = [
  {
    name: "Rum Cake",
    description: "Moist cake soaked in Caribbean rum with dried fruits",
    price: "£6.99",
    spicy: false,
    vegetarian: true
  },
  {
    name: "Coconut Drops",
    description: "Sweet coconut and ginger candy",
    price: "£4.99",
    spicy: false,
    vegetarian: true
  },
  {
    name: "Sweet Potato Pudding",
    description: "Traditional Caribbean dessert with coconut and spices",
    price: "£5.99",
    spicy: false,
    vegetarian: true
  }
];

const drinks = [
  {
    name: "Fresh Coconut Water",
    description: "Straight from the coconut",
    price: "£3.99",
    spicy: false,
    vegetarian: true
  },
  {
    name: "Sorrel Drink",
    description: "Hibiscus flower drink with ginger and spices",
    price: "£2.99",
    spicy: false,
    vegetarian: true
  },
  {
    name: "Mango Smoothie",
    description: "Fresh mango blended with coconut milk",
    price: "£4.99",
    spicy: false,
    vegetarian: true
  },
  {
    name: "Jamaican Beer",
    description: "Red Stripe or Dragon Stout",
    price: "£3.99",
    spicy: false,
    vegetarian: true
  }
];

interface MenuItemProps {
  name: string;
  description: string;
  price: string;
  spicy: boolean;
  vegetarian: boolean;
}

function MenuItem({ name, description, price, spicy, vegetarian }: MenuItemProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: '100%' }}>
      <Group justify="space-between" align="flex-start" mb="xs">
        <Title order={4} size="h5">{name}</Title>
        <Group gap="xs">
          {spicy && <IconFlame size={16} color="#ea580c" />}
          {vegetarian && <IconLeaf size={16} color="#22c55e" />}
        </Group>
      </Group>
      <Text size="sm" c="dimmed" mb="md" style={{ flexGrow: 1 }}>
        {description}
      </Text>
      <Text fw={600} size="lg" c="orange">{price}</Text>
    </Card>
  );
}

export function RestaurantMenuPage() {
  return (
    <RestaurantLayout>
      <Box>
        {/* Hero Section */}
        <AnimatedSection>
          <Box 
            style={{
              background: `linear-gradient(135deg, rgba(5,150,105,0.9) 0%, rgba(52,211,153,0.9) 100%), url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80') center/cover no-repeat`,
              minHeight: '40vh',
              display: 'flex',
              alignItems: 'center',
              color: 'white',
              textAlign: 'center'
            }}
          >
            <Container size="lg">
              <Title order={1} size="3rem" mb="md" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                Our Menu
              </Title>
              <Text size="xl" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                Discover the authentic flavors of the Caribbean
              </Text>
            </Container>
          </Box>
        </AnimatedSection>

        {/* Menu Legend */}
        <AnimatedSection delay={0.1}>
          <Container size="lg" py="md">
            <Group justify="center" gap="xl">
              <Group gap="xs">
                <IconFlame size={20} color="#ea580c" />
                <Text size="sm">Spicy</Text>
              </Group>
              <Group gap="xs">
                <IconLeaf size={20} color="#22c55e" />
                <Text size="sm">Vegetarian</Text>
              </Group>
            </Group>
          </Container>
        </AnimatedSection>

        {/* Menu Sections */}
        <AnimatedSection delay={0.15}>
          <Container size="lg" py="xl">
            <Tabs defaultValue="starters" color="green">
              <Tabs.List grow>
                <Tabs.Tab value="starters">Starters</Tabs.Tab>
                <Tabs.Tab value="mains">Main Courses</Tabs.Tab>
                <Tabs.Tab value="sides">Sides</Tabs.Tab>
                <Tabs.Tab value="desserts">Desserts</Tabs.Tab>
                <Tabs.Tab value="drinks">Drinks</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="starters" pt="xl">
                <Title order={2} ta="center" mb="xl" c="green">Starters</Title>
                <Grid>
                  {starters.map((item, index) => (
                    <Grid.Col key={index} span={{ base: 12, md: 6, lg: 3 }}>
                      <MenuItem {...item} />
                    </Grid.Col>
                  ))}
                </Grid>
              </Tabs.Panel>

              <Tabs.Panel value="mains" pt="xl">
                <Title order={2} ta="center" mb="xl" c="green">Main Courses</Title>
                <Grid>
                  {mains.map((item, index) => (
                    <Grid.Col key={index} span={{ base: 12, md: 6, lg: 4 }}>
                      <MenuItem {...item} />
                    </Grid.Col>
                  ))}
                </Grid>
              </Tabs.Panel>

              <Tabs.Panel value="sides" pt="xl">
                <Title order={2} ta="center" mb="xl" c="green">Sides</Title>
                <Grid>
                  {sides.map((item, index) => (
                    <Grid.Col key={index} span={{ base: 12, md: 6, lg: 3 }}>
                      <MenuItem {...item} />
                    </Grid.Col>
                  ))}
                </Grid>
              </Tabs.Panel>

              <Tabs.Panel value="desserts" pt="xl">
                <Title order={2} ta="center" mb="xl" c="green">Desserts</Title>
                <Grid>
                  {desserts.map((item, index) => (
                    <Grid.Col key={index} span={{ base: 12, md: 6, lg: 4 }}>
                      <MenuItem {...item} />
                    </Grid.Col>
                  ))}
                </Grid>
              </Tabs.Panel>

              <Tabs.Panel value="drinks" pt="xl">
                <Title order={2} ta="center" mb="xl" c="green">Drinks</Title>
                <Grid>
                  {drinks.map((item, index) => (
                    <Grid.Col key={index} span={{ base: 12, md: 6, lg: 3 }}>
                      <MenuItem {...item} />
                    </Grid.Col>
                  ))}
                </Grid>
              </Tabs.Panel>
            </Tabs>
          </Container>
        </AnimatedSection>

        {/* Special Note */}
        <AnimatedSection delay={0.25}>
          <Box style={{ background: '#f8fafc', padding: '60px 0' }}>
            <Container size="lg">
              <Card shadow="sm" padding="xl" radius="md" withBorder>
                <Title order={3} ta="center" mb="md" c="green">
                  Special Dietary Requirements
                </Title>
                <Text ta="center" c="dimmed">
                  We can accommodate most dietary requirements including gluten-free, dairy-free, and vegan options. 
                  Please inform us of any allergies or special requirements when making your reservation, 
                  and our chef will be happy to modify dishes accordingly.
                </Text>
              </Card>
            </Container>
          </Box>
        </AnimatedSection>
      </Box>
    </RestaurantLayout>
  );
}
