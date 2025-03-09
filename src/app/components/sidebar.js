"use client";

import { Box, VStack, Link, Icon, Text,Button } from "@chakra-ui/react";
import { FiHome, FiUser, FiFileText, FiSettings ,FiLogOut} from "react-icons/fi";
import NextLink from "next/link";
import { useTheme } from 'next-themes';
const Sidebar = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <Box
      w="260px"
      h="100vh"
      p="6"
      position="fixed"
      bg={theme === "light" ? "white" : "gray.900"}
      color={theme === "light" ? "gray.700" : "white"}
      boxShadow="lg"
    >
      {/* Dashboard Title */}
      <Text fontSize="2xl" fontWeight="bold" mb="6">
        Dashboard
      </Text>

      {/* Sidebar Links */}
      <VStack align="start" spacing={4} w="full">
        <SidebarItem icon={FiHome} label="Tasks" href="../dashboard/tasks" />
        <SidebarItem icon={FiUser} label="Users" href="../dashboard/users" />
        <SidebarItem icon={FiFileText} label="Reports" href="../dashboard/reports" />
        <SidebarItem icon={FiSettings} label="Settings" href="/dashboard/settings" />
      </VStack>

      {/* Logout Button */}
      <Button
        leftIcon={<FiLogOut />}
        
        mt="auto"
        w="fit"
        fontSize="md"
        marginTop="32"
        marginLeft="32"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Box>
    
  );
};
const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "../"; // Redirect after logout
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