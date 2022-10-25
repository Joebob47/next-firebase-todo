import { Container, Image, Box, Center } from "@chakra-ui/react";
import Auth from "../components/Auth";

export default function Home() {
  return (
    <Container maxW="7xl">
        <Auth />
        <Center>
        <Box position="relative"  mt="20" bg='white'>
          {/*cool image effect from https://www.youtube.com/watch?v=HMTyQjASff4&ab_channel=ChakraUI */}
            <Image
            src="/dailyTask.jpg"
            position="absolute"
            objectFit="cover"
            inset={0}
            filter="blur(16px)"
            zIndex={0}
            transform = "scale(1.1,1.1)"
            boxSize='300px'
            alt="Daily Task App Logo"
            />
          <Image
            boxSize='300px'
            src='/dailyTask.jpg'
            alt='Daily Task App logo'
            zIndex={100}
            position="relative"
            
          />
        </Box>
      </Center>
      </Container>
  );
}