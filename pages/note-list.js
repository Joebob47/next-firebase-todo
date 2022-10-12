import { Container } from "@chakra-ui/react";
import Auth from "../components/Auth";
import NoteList from "../components/NoteList";

export default function ListNote() {
    return (
      <Container maxW="7xl">
      <Auth />
      <NoteList />
      </Container>
    );
  }