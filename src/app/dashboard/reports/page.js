
  import DashboardLayout from "../../components/dashlay/DashboardLayout";
import { Heading, Text } from "@chakra-ui/react";

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <Heading size="xl" color="black">Reports Page</Heading>
      <Text mt="4" color="black">Manage your account Reports here.</Text>
    </DashboardLayout>
  );
}
