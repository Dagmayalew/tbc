"use client";
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashlay/DashboardLayout";
import { Heading, Text, Container, Box, VStack, Spinner } from "@chakra-ui/react";
import { useTheme } from "next-themes";

export default function UsersPage() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Users from Fake API
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  return (
    <DashboardLayout>
      <Container maxW="container.md" py={10}>
        <Box
          w="full"
          p={6}
          borderRadius="lg"
          boxShadow="md"
          bg={isLight ? "gray.100" : "gray.900"}
          textAlign="center"
        >
          <Heading size="xl">Users Page</Heading>
          <Text mt="4" color="black">
            Manage your account Users Page here.
          </Text>
        </Box>

        {/* Show loading spinner */}
        {loading ? (
          <Box textAlign="center" mt={5}>
            <Spinner size="xl" />
          </Box>
        ) : (
          <VStack spacing={4} mt={6}>
            {users.map((user) => (
              <Box
                key={user.id}
                w="full"
                p={4}
                borderRadius="md"
                boxShadow="sm"
                bg={isLight ? "white" : "gray.800"}
              >
                <Heading size="md">{user.name}</Heading>
                <Text>Email: {user.email}</Text>
                <Text>Phone: {user.phone}</Text>
              </Box>
            ))}
          </VStack>
        )}
      </Container>
    </DashboardLayout>
  );
}
