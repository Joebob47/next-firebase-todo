import React, { useState, useEffect } from 'react';
import {
    Flex,
    InputGroup,
    InputLeftAddon,
    Input,
    Button,
    Text,
    AddIcon,
    useToast
} from "@chakra-ui/react";
import  Auth  from '../../components/Auth.jsx';
import firebase from 'firebase/app';
import {doc, getDoc, setDoc} from "firebase/firestore";
import { db } from "../../firebase";
import useAuth from '/hooks/useAuth';


const EventItem = ({itemData}) =>{
    //enforce user login
    //we should get a user object back from useAuth
    console.log("HELLO ITEMDATA" + JSON.stringify({itemData}));
    const [inputTitle, setTitle] = useState(itemData.title);
    const [inputDesc, setDesc] = useState(itemData.description);
    const [inputDate, setDate] = useState(itemData.date);
    const toast=useToast();
    console.log("HELLO ITEMDATA2");
    

    const {user} = useAuth() || {};
    if (!user){
        return;
    }
  
    const editEvent = async (itemData) => {
        console.log("HELLO EDIT TO DO");
        const docRef =  await doc(db, 'event', itemData.id);
        console.log(docRef);
        const docSnap = await getDoc(docRef);
        console.log(docSnap);
        if(docSnap.exists()){
            console.log(inputDesc)
            const newData = {
                title: inputTitle,
                description: inputDesc,
                date: inputDate
            }
            setDoc(docRef, newData, {merge:true})
            .then(docSnap =>{
                toast({
                    //reverse apostrophes let us have variables in the format. it will spit out what's in newStatus after title
                    title: 'Event successfully updated!',
                    status:'success'
                });
            })
            .catch(error => {
                console.log(error);
            })
        }
        
    };


  return (
    <>
    <Auth/>
    <Flex flexDir="column" maxW={800} align="center" justify="start" minH="100vh" m="auto" px={4} py={3}>
        <InputGroup>
          <Input type="text" value={inputTitle} onChange={(e) => setTitle(e.target.value)} placeholder="title" />
          <Input type="text" value={inputDesc} onChange={(e) => setDesc(e.target.value)} placeholder="description" />
          <Input type="date" value={inputDate} onChange={(e) => setDate(e.target.value)} placeholder="description" />
          <Button
            ml={2}
            onClick={() => editEvent(itemData)}
            pr={5}
            pl={5}
            bg="#2314ed" color="white"
            >
            Update
          </Button>
        </InputGroup>
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
        const docRef = doc(db, 'event', context.params.id);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            itemData = docSnap.data();
            itemData.id= context.params.id;
            console.log("docSnap exists!");
        }
        
        return{
            props: {
                itemData
            }
        };
    };
export default EventItem;