'use client'
import DashboardLayout from "../../components/dashlay/DashboardLayout";
import { Box, Heading, Text, Container } from "@chakra-ui/react";
import { useTheme } from 'next-themes';

export default function TasksPage() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <DashboardLayout>
      
      <Container maxW="container.md" py={10}>
        <Box
          w="full"
          p={6}
          borderRadius="lg"
          boxShadow="md"
          bg={isLight ? 'gray.100' : 'gray.900'}
          textAlign="center"
        >
          <Heading size="xl" color={isLight ? 'gray.800' : 'white'}>
            Tasks Page
          </Heading>
          <Text mt={4} fontSize="lg" color={isLight ? 'gray.600' : 'gray.300'}>
            Manage your account tasks here.
          </Text>
        </Box>
      </Container>
    </DashboardLayout>
  );
}
