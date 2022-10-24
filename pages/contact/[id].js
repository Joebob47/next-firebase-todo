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


const ContactItem = ({itemData}) =>{
    //enforce user login
    //we should get a user object back from useAuth
    console.log("HELLO ITEMDATA" + JSON.stringify({itemData}));
    const [inputName, setName] = useState(itemData.name);
    const [inputNum, setNum] = useState(itemData.number);
    const toast=useToast();
    console.log("HELLO ITEMDATA2");
    

    const {user} = useAuth() || {};
    if (!user){
        return;
    }
  
    const editContact = async (itemData) => {
        console.log("HELLO EDIT TO DO");
        const docRef =  await doc(db, 'contact', itemData.id);
        console.log(docRef);
        const docSnap = await getDoc(docRef);
        console.log(docSnap);
        if(docSnap.exists()){
            console.log(inputName)
            const newData = {
                name: inputName,
                number: inputNum
            }
            setDoc(docRef, newData, {merge:true})
            .then(docSnap =>{
                toast({
                    //reverse apostrophes let us have variables in the format. it will spit out what's in newStatus after title
                    title: 'Contact successfully updated!',
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
          <Input type="text" value={inputName} onChange={(e) => setName(e.target.value)} placeholder="title" />
          <Input type="text" value={inputNum} onChange={(e) => setNum(e.target.value)} placeholder="description" />
          <Button
            ml={2}
            onClick={() => editContact(itemData)}
            pr={5}
            pl={5}
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
        const docRef = doc(db, 'contact', context.params.id);
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
export default ContactItem;