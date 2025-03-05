"use client";
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashlay/DashboardLayout";
import { 
  Heading, Text, Container, Box, VStack, Spinner, Input, Button
} from "@chakra-ui/react";
import { useTheme } from "next-themes";

export default function UsersPage() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch Users from Fake API
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        const roles = ["Admin", "Editor", "Viewer"];
      const usersWithRoles = data.map(user => ({
        ...user,
        isActive: true, 
        role: roles[Math.floor(Math.random() * roles.length)] // Assign random role
      }));
      setUsers(usersWithRoles);
      
    
        // Set all users as active by default
        const usersWithStatus = data.map(user => ({
          ...user,
          isActive: true 
        }));
        setUsers(usersWithStatus);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  // Filter users based on search input
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle user status (Enable/Disable)
  const toggleUserStatus = (userId) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, isActive: !user.isActive } : user
      )
    );
  };

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
          <Text mt="4" color={isLight ? "gray.600" : "gray.300"}>
            Manage your account Users Page here.
          </Text>
          <Box mt={6} textAlign="center">
            <Input
            
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="lg"
              w="full"
              bg={isLight ? "white" : "gray.800"}
              color={isLight ? "black" : "white"}
              borderRadius="md"
              boxShadow="sm"
            />
          </Box>
        </Box>

        
        {loading ? (
          <Box textAlign="center" mt={5}>
            <Spinner size="xl" />
          </Box>
        ) : (
          <VStack spacing={4} mt={6}>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
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
                  
                  <Text>Status: {user.isActive ? "Active" : "Inactive"}</Text>
                  <Box mt={2}>
    <Text fontWeight="bold">Role:</Text>
    <select
      value={user.role}
      onChange={(e) => changeUserRole(user.id, e.target.value)}
      style={{
        padding: "6px",
        borderRadius: "5px",
        backgroundColor: isLight ? "white" : "#333",
        color: isLight ? "black" : "white",
      }}
    >
      <option value="Admin">Admin</option>
      <option value="Editor">Editor</option>
      <option value="Viewer">Viewer</option>
    </select>
  </Box>
                  <Button
                    mt={2}
                    colorScheme={user.isActive ? "red" : "green"}
                    onClick={() => toggleUserStatus(user.id)}
                  >
                    {user.isActive ? "Disable" : "Enable"} Account
                  </Button>
                </Box>
              ))
            ) : (
              <Text mt={4} color="gray.500">No users found.</Text>
            )}
          </VStack>
        )}
      </Container>
    </DashboardLayout>
  );
}
