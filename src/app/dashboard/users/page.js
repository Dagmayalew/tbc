"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import DashboardLayout from "../../components/dashlay/DashboardLayout";
import { Heading, Text, Container, Box, VStack, Spinner, Input, Button } from "@chakra-ui/react";
import { useTheme } from "next-themes";

const socket = io("http://localhost:4000"); 

export default function UsersPage() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [newTask, setNewTask] = useState({});

  useEffect(() => {
    // Fetch initial data
    const fetchData = async () => {
      try {
        const usersRes = await fetch("https://jsonplaceholder.typicode.com/users");
        const usersData = await usersRes.json();
        const roles = ["Admin", "Editor", "Viewer"];
        const usersWithRoles = usersData.map(user => ({
          ...user,
          isActive: true,
          role: roles[Math.floor(Math.random() * roles.length)]
        }));
        setUsers(usersWithRoles);

        // Fetch tasks
        const tasksRes = await fetch("https://jsonplaceholder.typicode.com/todos");
        const tasksData = await tasksRes.json();
        setTasks(tasksData);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();

    // WebSocket Listen 
    socket.on("taskList", (taskData) => {
      console.log("Received taskList event:", taskData);
      setTasks(taskData);
    });

    return () => {
      socket.off("taskList"); // Cleanup on unmount
    };
  }, []);

  // Function to add a new task
  const addTask = (userId) => {
    if (!newTask[userId]) return;
    const task = {
      id: tasks.length + 1,
      title: newTask[userId],
      userId: userId,
      completed: false,
    };

    // Send task to server via WebSocket
    socket.emit("addTask", task);
    
    setNewTask({ ...newTask, [userId]: "" });
  };

  // Function to delete a task
  const deleteTask = (taskId) => {
    // Send delete request to server via WebSocket
    socket.emit("deleteTask", taskId);
  };

  // Function to calculate completion percentage
  const getCompletionPercentage = (userId) => {
    const userTasks = tasks.filter(task => task.userId === userId);
    if (userTasks.length === 0) return 0;
    const completedTasks = userTasks.filter(task => task.completed).length;
    return Math.round((completedTasks / userTasks.length) * 100);
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
            Manage your users and their tasks here.
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
            />
          </Box>
        </Box>

        {loading ? (
          <Box textAlign="center" mt={5}>
            <Spinner size="xl" />
          </Box>
        ) : (
          <VStack spacing={4} mt={6}>
            {users.length > 0 ? (
              users.map((user) => (
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

                  <Box mt={4}>
                    <Text fontWeight="bold">Assigned Tasks:</Text>
                    <ul>
                      {tasks.filter(task => task.userId === user.id).map(task => (
                        <li key={task.id} style={{ color: task.completed ? "green" : "gray", fontSize: "14px" }}>
                          {task.title} {task.completed ? "✅" : "❌"}
                          <Button
                            ml={2}
                            colorScheme="red"
                            size="xs"
                            onClick={() => deleteTask(task.id)}
                          >
                            Delete
                          </Button>
                        </li>
                      ))}
                    </ul>
                    
                    {/* Add Task Input and Button */}
                    <Input
                      placeholder="Enter new task"
                      value={newTask[user.id] || ""}
                      onChange={(e) => setNewTask({ ...newTask, [user.id]: e.target.value })}
                      size="sm"
                      mt={2}
                    />
                    <Button
                      size="sm"
                      colorScheme="blue"
                      mt={2}
                      onClick={() => addTask(user.id)}
                    >
                      Add Task
                    </Button>
                  </Box>
                  <Box mt={2} fontWeight="bold">
                    Completion: {getCompletionPercentage(user.id)}%
                  </Box>
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
