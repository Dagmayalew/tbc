import DashboardLayout from "../../components/dashlay/DashboardLayout";
import { Heading, Text } from "@chakra-ui/react";
import Charts from "../../components/Charts"; // Import Client Component

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <Heading size="xl" color="black">Reports & Analytics</Heading>
      <Text mt="4" color="black">Visualizing data for tasks and users.</Text>
      
      <Charts /> 
    </DashboardLayout>
  );
}
