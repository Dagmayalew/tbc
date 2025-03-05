// _app.js
import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';
import theme from './theme'; // Adjust the path as necessary

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </ChakraProvider>
  );
}

export default MyApp;
