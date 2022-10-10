import React from 'react';
import{
    Box, 
    Heading,
    SimpleGrid,
    Text, 
    Badge, 
    Center,
    Link
} from '@chakra-ui/react';
import useAuth from '../../hooks/useAuth';
import{
    doc,
    getDoc
} from 'firebase/firestore';
import {db} from '../../firebase';
import {AddNote} from '../../components/AddNote';

// define the JSX component to show just one single todo
// we are going to pass data to this component from our getServerSideProps
//function ... NEXTJS will do this for us. This will be sent
//in the form of the property itemData

const noteItem = ({itemData}) =>{
    //enforce user login
    //we should get a user object back from useAuth
    const {user} = useAuth() || {};
    if (!user){
        return;
    }
    //if our code continues here, a user is logged in
    //return the JSX component 
    //from firestore doc field called title
    return(
        <Center>
            <Box boxShadow="dark-lg" p="6" rounded="md" bg="white"
            fontSize = {20} mt = {5} >
               <AddNote />
                <Badge bg="blue" color="white">
                    <Link href="/"> Back to List Page </Link>
                </Badge>
            </Box>
        </Center>
    )
}

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
    let itemData = null; //this is in case it doesn't find a record
    //get a doc from firestore
    const docRef = doc(db, 'notes', context.params.id);
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

export default noteItem;


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