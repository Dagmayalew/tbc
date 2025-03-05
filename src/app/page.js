'use client';
import ColorModeToggle from "../app/components/ColorModeToggle";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Flex, Input, Text, VStack } from '@chakra-ui/react';
import { useTheme } from 'next-themes';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('../api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage(data.message);
      router.push('/dashboard/tasks');
    } else {
      setMessage(data.message);
    }
  };

 
  const bgColor = theme === 'light' ? 'gray.100' : 'gray.700';
  const textColor = theme === 'light' ? 'black' : 'white';

  return (
    
    <Flex minH="100vh" align="center" justify="center" bg={theme === 'light' ? 'gray.200' : 'gray.800'}>
      
      <Box
        as="form"
        onSubmit={handleLogin}
        p={6}
        bg={bgColor}
        shadow="md"
        borderRadius="md"
        w="350px"
      >
        <> <ColorModeToggle /></>
        <Text color={textColor} fontSize="xl" fontWeight="bold" mb={4} textAlign="center">
          Admin Login
        </Text>

        <VStack spacing={4}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            mb={4}
            color={textColor}
            focusBorderColor="blue.500"
          />

          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            mb={4}
            color={textColor}
            focusBorderColor="blue.500"
          />

          <Button bgColor="blue.300" type="submit" colorScheme="blue" w="full">
            Login
          </Button>

          {message && <Text color="red.500" mt={2}>{message}</Text>}
        </VStack>
      </Box>
     
    </Flex>
  );
}
