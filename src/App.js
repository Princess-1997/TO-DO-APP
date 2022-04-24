import { useState, useEffect } from 'react';
import { collection, doc, setDoc, getDocs } from "firebase/firestore";

import './App.css';
import Todo from './Todo';
import db from './firebase';


function App() {

  const [input,setInput]=useState('');
  const [todos,setTodos]=useState([]);

  useEffect(()=>{
    async function getData(db){
        const ToDos = collection(db, 'todos');
        const TodosSnapshot = await getDocs(ToDos);
        setTodos(TodosSnapshot.docs.map(doc => doc.data().title));    
    }
    getData(db);
  },[]);

  async function addTodo(e){
    e.preventDefault();
    const newTodo = doc(collection(db, "todos"));
    await setDoc(newTodo, {title:input});
    setInput('');
  }

  return (
    <div className="App">
    <h1>ToDo App</h1>

    <form>
    <input type='text' value={input} onChange={e=>setInput(e.target.value)}/>
    <button disabled={!input} type='submit' onClick={addTodo}>ADD TO-DO</button>
    </form>
  
    {todos.map((todo,i)=>
        (<Todo title={todo} key={i}/>)
    )}
    </div>
  );
}

export default App;
