import { Container } from "@chakra-ui/react";
import Auth from "../components/Auth";
import EventList from "../components/EventList";

export default function ListEvent() {
    return (
      <Container maxW="7xl">
      <Auth />
      <EventList />
      </Container>
    );
  }