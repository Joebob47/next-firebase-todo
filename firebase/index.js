// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "fir-auth-f99be.firebaseapp.com",
  projectId: "fir-auth-f99be",
  storageBucket: "fir-auth-f99be.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//connect for authentication
const auth = getAuth(app);
//initializeApp gives us an obj value, and we pass it into getAuth
//so we can make subs calls to diff. parts of the SDK. This is the app we're
//connected to
const db = getFirestore(app);
export { auth, db };

/*
Instructions
Description
Our tenth assignment brings our journey to create a data-driven full-stack application to a close. This assignment has a two-week duration, and is not due until the end of Week 10. With this assignment, you are invited to continue with the application you built for the previous week's assignment. 

Requirements
There are seven requirements for the final data-driven full-stack app assignment.

Three datasets
Data relationships
Full CRUD support
Responsive and accessible user interface
Re-factor app to ensure security of Firebase secrets
Work locally
Deploy to Vercel
A. Three datasets. During this week, you are asked to extend the application to support the display, creation, and editing of a minimum of three datasets:

To Do Items (with a minimum of one user-entered field)
Events (with a minimum of two user-entered fields)
Contacts (with a minimum of four user-entered fields)
B. Data relationships. You are also asked to conform the data model approach that all of the datasets use, choosing from the following architectural patterns:

Single Firestore collection for each user, with a sub-collection for each dataset (to-dos, events, contacts). Or instead of using sub-collections, include a "type" field in each document that identifies the dataset. In this architecture, the collection ID is set to match the user ID, establishing a relationship between users and collections.
 Separate Firestore collection for each dataset (to-dos, events, contacts), with each document containing a field set to match the user ID, establishing a relationship between users and documents.
C. Full CRUD support. Your final full-stack app must support all four common data operations for each document in the Firestore database. These data operations include:

Create: user must have the ability to create new documents in each dataset.
Retrieve: application must retrieve and display documents in each dataset.
Update: user must have the ability to edit the fields of each existing document.
Delete: user must have the ability to delete individual documents.
D. Responsive and accessible user interface. You are asked to more fully utilize the Chakra UI React component library to implement a consistent user interface for your entire full-stack application that is both responsive and accessible.

E. Re-factor app to ensure security of Firebase secrets. The original v9 tutorial left the Firebase credentials embedded in a project file that was managed by git and therefore checked into the GitHub repository. This is not a secure practice. It is important to conceal and protect the Firebase credentials, which should be stored in a file that is not be part of the git repository.

F. Work locally. Use a local development environment to develop your creation. Manage your application's code using a GitHub repository and git from your workspace shell's command-line interface. Copy all project files once completed to your team Repl.it workspace as well.

G. Deploy finished app to Vercel. The finished app should be deployed to Vercel.

Purpose
Continue writing server-side JavaScript code for the Node.js runtime.
Develop a full-stack application that works with multiple data collections and dynamic page routing.
Ensure app users are presented with a responsive and accessible interface.
Use a browser-based integrated development environment.
Use version control to manage application code.
*/