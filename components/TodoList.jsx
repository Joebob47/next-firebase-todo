import {
    Badge,
    Box,
    Heading,
    SimpleGrid,
    Text,
    useToast,
    } from "@chakra-ui/react";
    import React, { useEffect } from "react";
    import useAuth from "../hooks/useAuth";
    //onSnapshot is when firestore sends back data
    //query is a search method, where is setting up criteria for that query
    import { collection, onSnapshot, query, where } from "firebase/firestore";
    import { db } from "../firebase";
    import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
    import { deleteTodo, toggleTodoStatus } from "../api/todo";
    
    const TodoList = () => {
        const [todos, setTodos] = React.useState([]);
        const {  user } = useAuth() || {};
        const toast = useToast();
        // a nested function that does the work of updating the list from
        //firestore data
        const refreshData = () => {
            if (!user) {
                setTodos([]);
                return;
            }
            //if our code continues execution here, a user is logged in
            // query on firestore collection. first we pass a reference to
            //the collection() passing db global (referring to our database)
            //and the collection name "todo". 
            //Now, where (field name, string to define comparison, comparee)
            //every document in this todo collection is going to have a field
            //query is async and a value object
            const q = query(collection(db, "todo"), where("user", "==", user.uid));
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
                setTodos(ar);
            });
        };

        useEffect(() => {
            refreshData();
        }, 
        [user]
        );

        const handleTodoDelete = async (id) => {
            if (confirm("Are you sure you want to delete this todo?")) {
                deleteTodo(id);
                toast({ title: "Todo deleted successfully", status: "success" });
            }
        };

        const handleToggle = async (id, status) => {
            const newStatus = status == "completed" ? "pending" : "completed";
            await toggleTodoStatus({ 
                docId: id, 
                status: newStatus 
            });
            toast({
                //reverse apostrophes let us have variables in the format. it will spit out what's in newStatus after title
                title: `Todo marked ${newStatus}`,
                status: newStatus == "completed" ? "success" : "warning",
            });
        };
        //FINALLY WE CAN DEFINE THE JSX FOR OUR COMPONENT
        //WE ARE LOOPING THROUGH THE ARRAY THAT CAME BACK TO US IN THE TO DOS
        return (
            <Box mt={5}>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
                { todos &&
                todos.map((todo) => (
                    <Box
                        p={3}
                        boxShadow="2xl"
                        shadow={"dark-lg"}
                        transition="0.2s"
                        _hover={{ boxShadow: "sm" }}
                        key = {todo.id}
                        >
                        <Heading as="h3" fontSize={"xl"}>
                            {todo.title}{" "}
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
                                onClick={() => handleTodoDelete(todo.id)}
                                >
                                <FaTrash />
                            </Badge>
                            <Badge
                                color={todo.status == "pending" ? "gray.500" : "green.500"}
                                bg="inherit"
                                transition={"0.2s"}
                                _hover={{
                                bg: "inherit",
                                transform: "scale(1.2)",
                                }}
                                float="right"
                                size="xs"
                                onClick={() => handleToggle(todo.id, todo.status)}
                                >
                                {todo.status == "pending" ? <FaToggleOff /> : <FaToggleOn />}
                            </Badge>
                            <Badge
                                float="right"
                                opacity="0.8"
                                bg={todo.status == "pending" ? "yellow.500" : "green.500"}
                                >
                                {todo.status}
                            </Badge>
                        </Heading>
                        <Text>{todo.description}</Text>
                    </Box>
                ))}
                </SimpleGrid>
            </Box>
        );
    };
    export default TodoList;