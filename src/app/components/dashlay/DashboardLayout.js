"use client";

import Sidebar from "../sidebar";
import { Box, Flex } from "@chakra-ui/react";

export default function DashboardLayout({ children }) {
  return (
    <Flex>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box flex="1" ml="250px" p="6" bg="gray.100" minH="100vh">
        {children}
      </Box>
    </Flex>
  );
}
