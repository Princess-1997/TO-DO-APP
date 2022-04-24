/* import firebase from 'firebase'; */
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const app = initializeApp({
    apiKey: "AIzaSyCbxieslpK9MEc0VhbB4bEM6cBQk0kNI4c",
    authDomain: "to-do-app-a227c.firebaseapp.com",
    projectId: "to-do-app-a227c",
    storageBucket: "to-do-app-a227c.appspot.com",
    messagingSenderId: "875402807858",
    appId: "1:875402807858:web:a59f141841b7b4f77d4a2b"
});

const db = getFirestore(app);

/* async function getData(db){
    const ToDos = collection(db, 'todos');
    const TodosSnapshot = await getDocs(ToDos);
    const TodosList = TodosSnapshot.docs.map(doc => doc.data());
    return TodosList;
} */
export default db;