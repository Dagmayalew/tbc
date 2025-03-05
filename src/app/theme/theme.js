import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "system", // Sync with system preference
  useSystemColorMode: true,   // Allow system mode
};

const theme = extendTheme({ config });

export default theme;
