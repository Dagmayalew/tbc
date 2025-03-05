"use client";
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashlay/DashboardLayout";
import { Box, Heading, Text, Container, Button } from "@chakra-ui/react";
import { useTheme } from "next-themes";

export default function TasksPage() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const [tasks, setTasks] = useState([]);

  // Fetch
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

          <Button _hover={{ bg: "blue.600" }}  mt={4} colorScheme="blue" onClick={addNewPost}>
            Add New Post
          </Button>

          <Box mt={6} textAlign="left"  >
            {tasks.length > 0 ? (
              tasks.slice(0, 20).map((task) => (
                <Box key={task.id} p={4} borderWidth="1px" borderRadius="md" mb={3}>
                  <Heading size="md" color={isLight ? "gray.700" : "gray.200"}>
                    {task.title}
                  </Heading>
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
