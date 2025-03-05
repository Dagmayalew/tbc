"use client"; // Ensure client-side rendering

import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Sidebar from "../components/sidebar";

export default function DashboardPage() {
  return (
    <Flex>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box flex="1" p={6} bg="gray.100">
        <Heading as="h1" size="xl" fontWeight="bold">
          Welcome to Dashboard
        </Heading>
        <Text color="gray.600" mt={2}>
          Select an option from the sidebar.
        </Text>
      </Box>
    </Flex>
  );
}
