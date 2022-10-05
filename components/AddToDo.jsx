//first react component
//so we can use jsx to make a component to load React
import React from "react";
//add a bunch of Chakra components
import {
    Box,
    Input,
    Button,
    Textarea,
    Stack,
    Select,
    useToast,
} from "@chakra-ui/react";
//useAuth function, because this page requires authentication
import useAuth from "../hooks/useAuth";
//bring in addTodo from our api
import { addTodo } from "../api/todo";

//now let's define a React JSX component
const AddTodo = () => {
    //every form control (text input) we want to associate a react state, so it can be updated
    //because we imported the WHOLE REACT OBJECT, we must use React. now
    //React is setting these states with the function (i.e. sets title state with setTitle)
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [status, setStatus] = React.useState("pending");
    const [isLoading, setIsLoading] = React.useState(false);
    //useToast pops up a floating message (like, you're not logged in)
    const toast = useToast();
    const { isLoggedIn, user } = useAuth() || {};
    //where does USER come from again? it's the property set by setUser in useAuth()
    //let's define a function that runs to handle the toDo operation
    const handleTodoCreate = async () => {
        //are we NOT logged in?
        if (!isLoggedIn) {
            //show a floating alert if we're not logged in
            toast({
            title: "You must be logged in to create a todo",
            status: "error",
            duration: 9000,
            isClosable: true,
            });
            return;
        }   

        //if this code gets run, user is logged in

        setIsLoading(true);
        const todo = {
        title,
        description,
        status,
        //we have a field in our templated field set
        userId: user.uid,
        };
        //now we call the addToDo method that has the state values for title,
        //description, status, userID within it.
        //calling our api function that sholuld add a new doc to our firestore collection
        await addTodo(todo);
        //once we get past prev line, firestore database is made
        setIsLoading(false);
        setTitle("");
        setDescription("");
        setStatus("pending");
        //show a floaty with status update
        toast({ title: "Todo created successfully", status: "success" });
    };
    //return the markup for this addToDo JSX component (returning the UI)
    return (
        <Box w="40%" margin={"0 auto"} display="block" mt={5}>
            <Stack direction="column">
                <Input
                    placeholder="Title"
                    value={title}
                    //the curly is a JSX function. E is a local variable (can be named however you want), 
                    //standing for the event of a changing. When this changes
                    //look inside event's target property (the text input),
                    //and grab its value
                    //ONCHANGE IS A JS FUNCTION THAT EXECUTES WHEN A USER CHANGES THE VALUE OF AN ELEMENT
                    onChange={(e) => setTitle(e.target.value)}
                    />
                <Textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option
                        value={"pending"}
                        style={{ color: "yellow", fontWeight: "bold" }}
                    >
                    Pending ⌛
                    </option>
                    <option
                        value={"completed"}
                        style={{ color: "green", fontWeight: "bold" }}
                        >
                    Completed ✅
                    </option>
                </Select>
                <Button
                //THIS IS WHERE WE CALL HANDLETODOCREATE
                    onClick={() => handleTodoCreate()}
                    //we are disabling the button if the title react state variable has a length of less than one
                    //or if the desc length is less than 1, or if it's in the middle of operations
                    disabled={title.length < 1 || description.length < 1 || isLoading}
                    //CHAKRA BUTTON TRAITS
                    colorScheme="teal"
                    variant="solid"
                >
                Add
                </Button>
            </Stack>
        </Box>
    );
};

export default AddTodo;