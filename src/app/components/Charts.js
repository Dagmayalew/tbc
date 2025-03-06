"use client"; // Marks this as a Client Component

import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { Heading } from "@chakra-ui/react";

const taskData = [
  { month: "Jan", completed: 40 },
  { month: "Feb", completed: 55 },
  { month: "Mar", completed: 70 },
  { month: "Apr", completed: 90 },
  { month: "May", completed: 120 },
];

export default function Charts() {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <Heading size="md" color="black" mb={4}>
        Completed Tasks
      </Heading>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={taskData}>
          <XAxis dataKey="month" stroke="black" />
          <YAxis stroke="black" />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Line type="monotone" dataKey="completed" stroke="#4CAF50" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
