//going to isolate 
import { Container } from "@chakra-ui/react";
import AddEvent from "../components/addEvent.jsx";
import Auth from "../components/Auth";

export default function AddAnEvent() {
  return (
    <Container maxW="7xl">
    <Auth />
    <AddEvent />
    </Container>
  );
}