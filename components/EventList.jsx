import {
    Badge,
    Box,
    Heading,
    SimpleGrid,
    Text,
    useToast,
    Link,
    Button,
    Center
    } from "@chakra-ui/react";
    import React, { useEffect} from "react";
    import useAuth from "../hooks/useAuth";
    //onSnapshot is when firestore sends back data
    //query is a search method, where is setting up criteria for that query
    import { collection, onSnapshot, query, where } from "firebase/firestore";
    import { db } from "../firebase";
    import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
    import { deleteEvent} from "../api/todo";
    import {FcPlanner} from 'react-icons/fc';

    
    const EventList = () => {
        const [events, setEvents] = React.useState([]);
        const {  user } = useAuth() || {};
        const toast = useToast();
        // a nested function that does the work of updating the list from
        //firestore data
        const refreshData = () => {

        };

        useEffect(() => {
            if (!user) {
                setEvents([]);
                return;
            }
            //if our code continues execution here, a user is logged in
            // query on firestore collection. first we pass a reference to
            //the collection() passing db global (referring to our database)
            //and the collection name "todo". 
            //Now, where (field name, string to define comparison, comparee)
            //every document in this todo collection is going to have a field
            //query is async and a value object
            const q = query(collection(db, "event"), where("user", "==", user.uid));
            
            const s = 
            //this is an event handler with firebase, called on snapshot q is query
            //we issues, second method is another arrow function
            //it will wait for query q to be complete. when it's complete,
            //it will give me the querySnapshot
            onSnapshot(q, (querySnapshot) => {
                //in this function we have all the results from q in querySnapshot
                let ar = [];
                //loop thru each doc in result
                querySnapshot.docs.forEach((doc) => {
                    //ar will fill up with object values that have two properties
                    //... means if doc.data returns anything, we'll capture that
                    ar.push({ 
                        id: doc.id, ...doc.data() 
                    });
                    });
                //once we loop through using forEach and have array of docs in ar
                //When setTodos gets called, update the entire component
                setEvents(ar);
            });
            refreshData();
        }, 
        [user]
        );

        const handleEventDelete = async (id) => {
            if (confirm("Are you sure you want to delete this Event?")) {
                deleteEvent(id);
                toast({ title: "Event deleted successfully", status: "success" });
            }
        };

        //FINALLY WE CAN DEFINE THE JSX FOR OUR COMPONENT
        //WE ARE LOOPING THROUGH THE ARRAY THAT CAME BACK TO US IN THE TO DOS
        return (
            <Box mt={5}>
                <Button  boxShadow='dark-lg' p='6' rounded='md' bg='white' 
                backgroundColor = "#2314ed" color="white" position="absolute" right="6"
                  _hover={{
                    background: "white",
                    color: "#2314ed",
                  }}>
                    <Link style={{ textDecorationColor: '#2314ed' }} href="/add-event" 
                        _hover={{
                        textDecoration:"none"
                        }}>
                        <span>&#43;</span> Add Event </Link>
                </Button> <br/>
                <Center>
                    <Heading mt="12" mb ="5"> <FcPlanner size={25} style={{display:"inline"}}/> &nbsp; Your Events </Heading>
                </Center>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
                { events &&
                events.map((event) => (
                    <Box
                        p={3}
                        boxShadow="2xl"
                        shadow={"dark-lg"}
                        transition="0.2s"
                        _hover={{ boxShadow: "sm" }}
                        key = {event.id}
                        >
                        <Heading as="h3" fontSize={"xl"}>
                            {event.title}{" "}
                            <Badge
                                color="red.500"
                                bg="inherit"
                                transition={"0.2s"}
                                _hover={{
                                    bg: "inherit",
                                    transform: "scale(1.2)",
                                }}
                                float="right"
                                size="xs"
                                onClick={() => handleEventDelete(event.id)}
                                >
                                <FaTrash />
                            </Badge>
                        </Heading>
                        <Text>{event.description}</Text>
                        <Text>{event.date}</Text>
                    
                    </Box>
                ))}
                </SimpleGrid>
            </Box>
        );
    };
    export default EventList;