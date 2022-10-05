import { useEffect, useState } from "react";
import { auth } from "../firebase";
const useAuth = () => {
    //ASK REACT TO DEFINE STATE VARIABLE AND AN ASSOCIATED FUNCTION TO CHANGE ITS VALUE
    //useState is a react function, returned as an array value w/ two elements
    //the first is a ref to a user, next is a reference to a setter React will use
    //to set changes in our state
    const [user, setUser] = useState(null);
    //isLoggedIn = boolean, then set it. assign array value to false now
    //we're first saying is logged in? false
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    //useEffect is imported from React
    //we are passing an anonymous arrow func to useEffect
    //we're looking for some change in the state of us being authorized

    //ASK REACT TO MANAGE OUR STATE VARIABLE BASED ON A BLOCK OF CODE WE GIVE IT
    useEffect(() => {
        //onAuth... is a built in method
        //everytime the auth sstate changes, this method is called
        auth.onAuthStateChanged((user) => {
            //if there is a user, and a property populated for user id, true. otherwise false
            setIsLoggedIn(user && user.uid ? true : false);
            //user is the function name we passed to useState, which is imported
            //we're giving it the entire obj. value
            setUser(user);
        });
    });
return { user, isLoggedIn };
};
export default useAuth;

/*
const handleEmailAuth = async () => {
    // some async calls with promise
    signInWithEmailAndPassword(
        auth,
        email, 
        password
    ).then(
        // since we got a promise, inside the then we get results returns
        (userCredential) => {
            console.log(userCredential);
            // now we should be able to get info about the user who is logged in!
            const user = userCredential.user;
        }
    ).catch(
        (error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("authentication error " + errorCode + errorMessage);
        }
    );
};
*/