//going to isolate 
import { Container } from "@chakra-ui/react";
import AddNote from "../components/addNote";
import Auth from "../components/Auth";

export default function AddToDo() {
  return (
    <Container maxW="7xl">
    <Auth />
    <AddNote />
    </Container>
  );
}