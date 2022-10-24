//this is the code that's going to interact with the Firestore database
import { db } from "../firebase";
import {
    collection,
    addDoc,
    updateDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";

//ADDS TO DATABASE
const addTodo = async ({ userId, title, description, status }) => {
    try {
        //we await because we don't want to receive a promise
        //collection function takes two arguments - a reference to our
        //database (db), then the name of a collection -- which we didn't create
        //the second argument is a curly braced object value with properties of user,title,etc
        //our own code calls addTodo later. The object is prescribing the names 
        //of the firebase field names
        await addDoc(collection(db, "todo"), {
        user: userId,
        title: title,
        description: description,
        status: status,
        //this just inserts a new date value
        createdAt: new Date().getTime(),
    });
    } catch (err) {}
};

//docId for a firebasde document in our collection
//status value to communicate and update the document
//this function allows us to CHANGE THE STATUS
const toggleTodoStatus = async ({ docId, status }) => {
    try {
        //doc function was imported, db = reference to global var with database inside
        //name of collection = "todo"
        //docId = document id for firebase resource
        //grab a reference to an existing document by id
        const todoRef = doc(db, "todo", docId);
        //run that doc
        // we are updating the field name status
        console.log(status)
        await updateDoc(todoRef, {
        status: status,
    });
    } catch (err) {
        console.log(err);
    }
};

//DELETES A RESOURCE
const deleteTodo = async (docId) => {
    try {
        const todoRef = doc(db, "todo", docId);
        await deleteDoc(todoRef);
    } catch (err) {
        console.log(err);
    }
};

// NOW THIS IS ALL FOR THE ADD NOTE *******************************
//ADDS TO DATABASE
const makeEvent = async ({ userId, title, description, status, date}) => {
    try {
        //we await because we don't want to receive a promise
        //collection function takes two arguments - a reference to our
        //database (db), then the name of a collection -- which we didn't create
        //the second argument is a curly braced object value with properties of user,title,etc
        //our own code calls addTodo later. The object is prescribing the names 
        //of the firebase field names
        await addDoc(collection(db, "event"), {
        user: userId,
        title: title,
        description: description,
        status: status,
        date: date,
        //this just inserts a new date value
        createdAt: new Date().getTime(),
    });
    } catch (err) {}
};

//docId for a firebasde document in our collection
//status value to communicate and update the document
//this function allows us to CHANGE THE STATUS
const toggleEventStatus = async ({ docId, mystatus }) => {
    try {
        //doc function was imported, db = reference to global var with database inside
        //name of collection = "note"
        //docId = document id for firebase resource
        //grab a reference to an existing document by id
        const eventRef = doc(dbN, "event", docId);
        //run that doc
        // we are updating the field name status
        await updateDoc(eventRef, {
        status: mystatus,
    });
    } catch (err) {
        console.log(err);
    }
};

//DELETES A RESOURCE
const deleteEvent = async (docId) => {
    try {
        const eventRef = doc(db, "event", docId);
        await deleteDoc(eventRef);
    } catch (err) {
        console.log(err);
    }
};

// NOW THIS IS ALL FOR THE ADD CONTACT*******************************
//ADDS TO DATABASE
const makeContact = async ({ userId, status, name, number}) => {
    try {
        //we await because we don't want to receive a promise
        //collection function takes two arguments - a reference to our
        //database (db), then the name of a collection -- which we didn't create
        //the second argument is a curly braced object value with properties of user,title,etc
        //our own code calls addTodo later. The object is prescribing the names 
        //of the firebase field names
        await addDoc(collection(db, "contact"), {
        user: userId,
        name: name,
        number: number,
        //this just inserts a new date value
        createdAt: new Date().getTime(),
    });
    } catch (err) {}
};

//docId for a firebasde document in our collection
//status value to communicate and update the document
//this function allows us to CHANGE THE STATUS
const toggleContactStatus = async ({ docId, mystatus }) => {
    try {
        //doc function was imported, db = reference to global var with database inside
        //name of collection = "note"
        //docId = document id for firebase resource
        //grab a reference to an existing document by id
        const contactRef = doc(dbN, "contact", docId);
        //run that doc
        // we are updating the field name status
        await updateDoc(contactRef, {
        status: mystatus,
    });
    } catch (err) {
        console.log(err);
    }
};

//DELETES A RESOURCE
const deleteContact = async (docId) => {
    try {
        const contactRef = doc(db, "contact", docId);
        await deleteDoc(contactRef);
    } catch (err) {
        console.log(err);
    }
};


export { addTodo, makeEvent, makeContact, toggleTodoStatus, toggleEventStatus, 
    toggleContactStatus, deleteTodo, deleteEvent, deleteContact};
