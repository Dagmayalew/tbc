"use client";
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashlay/DashboardLayout";
import { Box, Heading, Text, Container, Button, SimpleGrid } from "@chakra-ui/react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

// Animated Number Component
const AnimatedNumber = ({ value }) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {value}
    </motion.span>
  );
};

export default function TasksPage() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const [tasks, setTasks] = useState([]);
  const [socket, setSocket] = useState(null);

  // Fetch Initial Tasks
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  // Add
  const addNewPost = () => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: "New Post",
        body: "najsjqidjqijdiqcjsanjcncijqijxkqxjqnjencijcicnsj.",
        userId: 1
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New Post Added:", data);
        setTasks((prevTasks) => [data, ...prevTasks]);
      })
      .catch((error) => console.error("Error adding post:", error));
  };

  // Update
  const updatePost = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        title: "Updated Title",
        body: "Updated body content.",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(updatedTask => {
        console.log("Post Updated:", updatedTask);
  
        
        setTasks(prevTasks =>
          prevTasks.map(task =>
            task.id === id ? { ...task, ...updatedTask } : task
          )
        );
      })
      .catch(error => console.error("Error updating post:", error));
  };
  const deletePost = (id) => {
    // Send DELETE request to API
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // If deletion is successful, update the state
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      })
      .catch((error) => console.error("Error deleting post:", error));
  };
  

  // WebSocket Connection
  useEffect(() => {
    const socketUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL || "ws://localhost:3000/ws"; 
  
    const ws = new WebSocket(socketUrl);
  
    ws.onopen = () => {
      console.log("Connected to WebSocket");
    };
  
    ws.onmessage = (event) => {
      try {
        const newTask = JSON.parse(event.data);
        setTasks((prevTasks) => [newTask, ...prevTasks]);
        showNotification("New Task Added", newTask.title);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };
  
    ws.onclose = (event) => {
      console.log("WebSocket Disconnected", event);
      setTimeout(() => {
        console.log("Reconnecting WebSocket...");
        setSocket(new WebSocket(socketUrl));
      }, 5000); // Try reconnecting after 5 seconds
    };
  
    ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };
  
    setSocket(ws);
  
    return () => {
      ws.close();
    };
  }, []);
  

  // Show Browser Notification
  const showNotification = (title, body) => {
    if (Notification.permission === "granted") {
      new Notification(title, { body });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(title, { body });
        }
      });
    }
  };

  const completedTasks = tasks.filter((_, index) => index % 2 === 0).length;
  const pendingTasks = tasks.length - completedTasks;

  return (
    <DashboardLayout>
      <Container maxW="container.md" py={10}>
        <Box w="full" p={6} borderRadius="lg" boxShadow="md" bg={isLight ? "gray.100" : "gray.900"} textAlign="center">
          <Heading size="xl" color={isLight ? "gray.800" : "white"}>Tasks Page</Heading>
          <Text mt={4} fontSize="lg" color={isLight ? "gray.600" : "gray.300"}>
            Manage your tasks in real-time.
          </Text>
          <Button _hover={{ bg: "blue.600" }}  mt={4} colorScheme="blue" onClick={addNewPost}>
            Add New Post
          </Button>
          {/* Animated Stats Widgets */}
          <SimpleGrid columns={3} spacing={4} mt={6}>
            <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
              <Box p={4} borderRadius="md" bg="blue.500" color="white" textAlign="center">
                <Heading size="md">Total Tasks</Heading>
                <Text fontSize="2xl"><AnimatedNumber value={tasks.length} /></Text>
              </Box>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
              <Box p={4} borderRadius="md" bg="green.500" color="white" textAlign="center">
                <Heading size="md">Completed</Heading>
                <Text fontSize="2xl"><AnimatedNumber value={completedTasks} /></Text>
              </Box>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
              <Box p={4} borderRadius="md" bg="red.500" color="white" textAlign="center">
                <Heading size="md">Pending</Heading>
                <Text fontSize="2xl"><AnimatedNumber value={pendingTasks} /></Text>
              </Box>
            </motion.div>
          </SimpleGrid>

          {/* Task List */}
          <Box mt={6} textAlign="left">
            {tasks.length > 0 ? (
              tasks.slice(0, 100).map((task) => (
                <Box key={task.id} p={4} borderWidth="1px" borderRadius="md" mb={3}>
                  <Heading size="md" color={isLight ? "gray.700" : "gray.200"}>{task.title}</Heading>
                  <Text color={isLight ? "gray.600" : "gray.400"}>{task.body}</Text>
                  <Button
                    mt={2}
                    size="sm"
                    colorScheme="yellow"
                    _hover={{ bg: "blue.600" }} 
                    onClick={() => updatePost(task.id)}
                  >
                    Update Post
                  </Button>
                  <Button 
                  marginLeft='10'
                  _hover={{ bg: "blue.600" }} 
                  size="sm"
          mt={2} 
          colorScheme="red" 
          onClick={() => deletePost(task.id)}  // Calling deletePost on button click
        >
          Delete
        </Button>
                </Box>
              ))
            ) : (
              <Text mt={4} color={isLight ? "gray.600" : "gray.400"}>Loading tasks...</Text>
            )}
          </Box>
        </Box>
      </Container>
    </DashboardLayout>
  );
}
  