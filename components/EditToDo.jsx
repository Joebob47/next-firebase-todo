import { setDoc } from 'firebase/firestore';
import {db} from '../firebase';

{/* is it set() not setDoc()?? */}
export default function editTodo(todoID){
    
    const docRef= doc(db, "todo", todoID);
    setDoc(docRef, data, {merge:true})
    .then(docRef =>{
        console.log("DOC UPDATED");
    })
    .catch(error => {
        console.log(error);
    })
}