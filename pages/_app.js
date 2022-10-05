import { ChakraProvider } from "@chakra-ui/react";

//CHAKRA UI ASKS US TO DO THIS
function MyApp({ Component, pageProps }) {
return (
  <ChakraProvider>
  <Component {...pageProps} />
  </ChakraProvider>
);
}

export default MyApp
