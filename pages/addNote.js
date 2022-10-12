//going to isolate 
import { Container } from "@chakra-ui/react";
import AddNote from "../components/addNote.jsx";
import Auth from "../components/Auth";

export default function AddANote() {
  return (
    <Container maxW="7xl">
    <Auth />
    <AddNote />
    </Container>
  );
}