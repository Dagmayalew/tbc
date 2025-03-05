"use client";

import { Box, VStack, Link, Icon, Text } from "@chakra-ui/react";
import { FiHome, FiUser, FiFileText, FiSettings } from "react-icons/fi";
import NextLink from "next/link";
import { useTheme } from 'next-themes';
const Sidebar = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <Box 
      w="250px" 
      h="100vh" 
      
      color="white" 
      p="4"
      position="fixed"
      bg={theme === 'light' ? 'white' : 'black'}
    >
      <Text fontSize="xl" fontWeight="bold" mb="6">
        Dashboard
      </Text>
      
      <VStack align="start" spacing={4}>
        <SidebarItem icon={FiHome} label="Tasks" href="..//dashboard/tasks" />
        <SidebarItem icon={FiUser} label="Users" href="../dashboard/users" />
        <SidebarItem icon={FiFileText} label="Reports" href="../dashboard/reports" />
        <SidebarItem icon={FiSettings} label="Settings" href="/dashboard/settings" />
      </VStack>
    </Box>
  );
};

const SidebarItem = ({ icon, label, href }) => (
  <Link 
    as={NextLink} 
    href={href} 
    display="flex" 
    alignItems="center" 
    p="2"
    w="full"
    borderRadius="md"
    _hover={{ bg: "blue.600" }}
  >
    <Icon as={icon} mr="3" boxSize="5" />
    {label}
  </Link>
);

export default Sidebar;
