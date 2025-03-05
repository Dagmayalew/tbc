
  import DashboardLayout from "../../components/dashlay/DashboardLayout";
import { Heading, Text } from "@chakra-ui/react";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <Heading size="xl" color="black">Settings Page</Heading>
      <Text mt="4" color="black">Manage your account Settings here.</Text>
    </DashboardLayout>
  );
}
