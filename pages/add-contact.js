import { Container } from "@chakra-ui/react";
import AddContact from "../components/addContact.jsx";
import Auth from "../components/Auth";

export default function AddAContact() {
  return (
    <Container maxW="7xl">
    <Auth />
    <AddContact />
    </Container>
  );
}