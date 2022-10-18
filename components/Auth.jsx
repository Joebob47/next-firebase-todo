//npm install
//npm install react-icons --save
//THIS IS THE LOGIN INTERFACE THAT SUPPORTS USING THE GOOGLE AUTHENTICATION PROVIDER SERVICE
import React from "react";
import { Box, Button, Link, Text, useColorMode, Breadcrumb, BreadcrumbItem,
    BreadcrumbLink, Divider, Center, SimpleGrid
  } from "@chakra-ui/react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FaGoogle, FaMoon, FaSun } from "react-icons/fa";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";
import { createUserWithEmailAndPassword, } from "firebase/auth";

const Auth = () => {
    //this is a method imported from chakra UI, light and dark feature
    const { toggleColorMode, colorMode } = useColorMode();
    //this returns us an object with keys of isLoggedIn and user
    const { isLoggedIn, user } = useAuth();
    //DEFINE A FUNCTION TO PERFORM THE LOGIN OPERATION
    const handleAuth = async () => {
        const provider = new GoogleAuthProvider();
        //SOME ASYNC CALLS WITH PROMISE
        //we pulled this from auth pkg from firebase. passing auth var and provider
        //we've got a function we built in index that connects to getAuth
        //call from Firebase. Use that together with provider object to
        //throw up a signin
        signInWithPopup(auth, provider)
        //parallell to email and password
        //SINCE WE GOT A PROMISE, INSIDE THE THEN WE GET RESULTS RETURNED
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            //NOW WE SHOULD BE ABLE TO GET INFO ABOUT THE USER WHO HAS LOGGED IN
            // The signed-in user info.
            const user = result.user;
    // ...
    })
    .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
}; //handleAuth finished
    return (
        //if color mode is dark, do sun, else do moon
        //if is logged in is true, output this... (it's a JSX shortcut)
        //the signout method is a method of the auth function
        //the FORWARD SLASH takes you to the root, top of project directory
        <>
            {/*bgColor="#d8df22" */}
        <Box>
            <Button onClick={() => toggleColorMode()}>
            {colorMode == "dark" ? <FaSun /> : <FaMoon />}
            </Button>{" "}
            {isLoggedIn && (
            <>
            &nbsp;
            <Text as="span" mr="4" color="green.500">{user.email}</Text> 
            <Link mr= "2" color="red.500" onClick={() => auth.signOut()}>
            Logout
            </Link>
            </>
            )}
            {!isLoggedIn && (
            <Button leftIcon={<FaGoogle />} onClick={() => handleAuth()}>
            Login with Google
            </Button>
            )}
        </Box>

        <Divider orientation='horizontal' />
    </>
    );
};
export default Auth;
