import React, { useState, useEffect } from 'react';
import {
    Flex,
    InputGroup,
    InputLeftElement,
    Input,
    Button,
    Text,
    AddIcon,
} from "@chakra-ui/react";
import { Auth } from '/components/Auth.jsx';
import firebase from 'firebase/app';
import {doc , getDoc} from "firebase/firestore";
import { db } from "../../firebase";
import useAuth from '/hooks/useAuth';


const toDoItem = ({itemData}) =>{
    //enforce user login
    //we should get a user object back from useAuth
    console.log("HELLO ITEMDATA");
    const [inputTitle, setTitle] = useState(itemData.title);
    const [inputDesc, setDesc] = useState(itemData.description);
    const [statusMsg, setStatusMsg] = useState('');
    console.log("HELLO ITEMDATA2")
    
    const {user} = useAuth() || {};
    if (!user){
        return;
    }
  
  const sendData = async () => {
    try {
        console.log("KJKJDLFJDALJFLADJFLA");
      console.log("sending!");
      // try to update doc
      const docref = await firebase.firestore().collection("todo").doc(itemData.id);
      const doc = docref.get();

      if (!doc.empty) {
        docref.update(
          {
            title: inputTitle,
            description: inputDesc
          }
        );
        setStatusMsg("Updated!");
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <Auth/>
    <Flex flexDir="column" maxW={800} align="center" justify="start" minH="100vh" m="auto" px={4} py={3}>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<AddIcon color="gray.300" />}
          />
          <Input type="text" value={inputTitle} onChange={(e) => setTitle(e.target.value)} placeholder="title" />
          <Input type="text" value={inputDesc} onChange={(e) => setDesc(e.target.value)} placeholder="description" />
          <Button
            ml={2}
            onClick={() => sendData()}
            >
            Update
          </Button>
        </InputGroup>
        <Text>
          {statusMsg}
        </Text>
      </Flex>
    </>
  );
};

//define the REQUIRED getServerSideProps function that NEXTJS will
//call whenever it gets a dynamically routed URL .. this is
//any url that looks like /todo/blahblahblah <- here the id = blah
//.. whatever comes after that
//slash is going to be dynamically routed
//nextJS passes a parameter to us. our function will receive everything
//it needs to know from context variable

export async function getServerSideProps(context){
    //if we want to get the url parameter that next.js set for the id value
    //we will look inside context at the params object, and get the property
    //name out of there
    console.log("HELLO SERVERSIDE");
        let itemData = null; //this is in case it doesn't find a record
        //get a doc from firestore
        const docRef = doc(db, 'todo', context.params.id);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            itemData = docSnap.data();
        }
    
        return{
            props: {
                itemData
            }
        };
    }
export default toDoItem;


/*
                <Heading as = 'h1' fontSize = {"xl"}>
                    {itemData.title}
                </Heading>
                <Text>
                    {itemData.description}
                </Text>
                <Text>
                    {itemData.status}
                </Text>
                <Text>
                    {itemData.createdAt}
                </Text>
*/

/*
const editToDo = async (itemData) => {
    console.log("THIS IS IN EDITTODO: " + {itemData})
    const docRef= doc(db, "todo", itemData.id);
    if(itemData){
    set(docRef, itemData, {merge:true})
    .then(docRef =>{
        console.log("DOC UPDATED");
    })
    .catch(error => {
        console.log(error);
    })
}
};

const noteItem = ({itemData}) =>{
    //enforce user login
    //we should get a user object back from useAuth
        //every form control (text input) we want to associate a react state, so it can be updated
    //because we imported the WHOLE REACT OBJECT, we must use React. now
    //React is setting these states with the function (i.e. sets title state with setTitle)
console.log("THIS IS ITEMDATA: " + {itemData});
    //useToast pops up a floating message (like, you're not logged in)
    const [title, setTitle] = React.useState({title});
    const [description, setDescription] = React.useState({description});
    const [status, setStatus] = React.useState({status});
    const [isLoading, setIsLoading] = React.useState(false);
    //useToast pops up a floating message (like, you're not logged in)
    const toast = useToast();
    const { isLoggedIn, user } = useAuth() || {};

 
    return(
        <Box w="40%" margin={"0 auto"} display="block" mt={5}>
            <Stack direction="column">
                <Input
                    placeholder={itemData.title}
                    value={title}
                        //the curly is a JSX function. E is a local variable (can be named however you want), 
                        //standing for the event of a changing. When this changes
                        //look inside event's target property (the text input),
                        //and grab its value
                        //ONCHANGE IS A JS FUNCTION THAT EXECUTES WHEN A USER CHANGES THE VALUE OF AN ELEMENT
                        onChange={(e) => setTitle(e.target.title)}
                />
                <Button onClick = {()=> editToDo(itemData.title) }>
                    submit changes
                </Button>
                <Textarea
                    placeholder={itemData.description}
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
                <Button onClick = {()=>editToDo(itemData)}>
                    Submit changes
                </Button>
                <Badge bg="blue" color="white">
                    <Link href="/"> Back to List Page </Link>
                </Badge>
            </Stack>
        </Box> */

/*
                <Heading as = 'h1' fontSize = {"xl"}>
                    {itemData.title}
                </Heading>
                <Text>
                    {itemData.description}
                </Text>
                <Text>
                    {itemData.status}
                </Text>
                <Text>
                    {itemData.createdAt}
                </Text>
*/