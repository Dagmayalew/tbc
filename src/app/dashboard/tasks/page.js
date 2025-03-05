"use client";
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashlay/DashboardLayout";
import { Box, Heading, Text, Container } from "@chakra-ui/react";
import { useTheme } from "next-themes";

export default function TasksPage() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const [tasks, setTasks] = useState([]); 

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setTasks(data)) 
      .catch((error) => console.error("Error fetching tasks:", error));
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
          <Heading size="xl" color={isLight ? "gray.800" : "white"}>
            Tasks Page
          </Heading>
          <Text mt={4} fontSize="lg" color={isLight ? "gray.600" : "gray.300"}>
            Manage your account tasks here.
          </Text>

         
          <Box mt={6} textAlign="left">
            {tasks.length > 0 ? (
              tasks.slice(0, 10).map((task) => ( // Display only first 5 tasks
                <Box key={task.id} p={4} borderWidth="1px" borderRadius="md" mb={3}>
                  <Heading size="md" color={isLight ? "gray.700" : "gray.200"}>
                    {task.title}
                  </Heading>
                  <Text color={isLight ? "gray.600" : "gray.400"}>{task.body}</Text>
                </Box>
              ))
            ) : (
              <Text mt={4} color={isLight ? "gray.600" : "gray.400"}>
                Loading tasks...
              </Text>
            )}
          </Box>
        </Box>
      </Container>
    </DashboardLayout>
  );
}
