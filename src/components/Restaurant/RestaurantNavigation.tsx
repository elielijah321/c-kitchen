import { Group, Container, Title, Box } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconToolsKitchen2 } from '@tabler/icons-react';

export function RestaurantNavigation() {

  return (
    <Box style={{ 
      background: 'linear-gradient(135deg, #059669 0%, #34d399 100%)', 
      borderBottom: '2px solid #065f46', 
      padding: '15px 0',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }}>
      <Container size="lg">
        <Group justify="space-between" align="center">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Group gap="xs" align="center">
              <IconToolsKitchen2 size={32} color="white" />
              <Title order={2} style={{ color: 'white', fontSize: '1.8rem', fontWeight: 700 }}>
                Caribbean Kitchen
              </Title>
            </Group>
          </Link>


        </Group>
      </Container>
    </Box>
  );
}
