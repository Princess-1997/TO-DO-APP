import { useState, useEffect } from 'react';
import { collection, doc, setDoc, getDocs, updateDoc, deleteDoc, query, orderBy} from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";

import './App.css';
import Todo from './Todo';
import db from './firebase';


function App() {

  const [input,setInput]=useState('');
  const [todos,setTodos]=useState([]);
  const [status,setStatus]=useState([]);
  const [todoId,setTodoId]=useState('');

  useEffect(()=>{
    async function getData(db){
        const ToDos = collection(db, 'todos');
        const q = query(ToDos, orderBy('time', 'asc'));
        const TodosSnapshot = await getDocs(q);
        setTodos(TodosSnapshot.docs.map(doc => doc.data().title));
        setStatus(TodosSnapshot.docs.map(doc => doc.data().status));
        setTodoId(TodosSnapshot.docs.map(doc => doc.id));
    }
    getData(db);
  },[todos]);

  async function addTodo(e){
    e.preventDefault();
    const newTodo = doc(collection(db, "todos"));
    await setDoc(newTodo, {title:input,status:'pending',time:`${Date.now()}`});
    setInput('');
  }

  async function onPending(index){
    if(status[index]==='pending'){
      const docRef=doc(db,'todos',todoId[index]);
      await updateDoc(docRef,{status:'done'})
    }else{
      const docRef=doc(db,'todos',todoId[index]);
      await updateDoc(docRef,{status:'pending'})
    } 
  }

  async function onRemove(index){
    const docRef=doc(db,'todos',todoId[index]);
    await deleteDoc(docRef);
  }

  return (
    <div className="App">
    <h3>Today's To-Do List</h3>

    <form className='input-container'>
    <input type='text' value={input} placeholder='Write a To-Do...'
    onChange={e=>setInput(e.target.value)}/>
    <button className='add-btn' disabled={!input} type='submit' onClick={addTodo}>ADD TO-DO</button>
    </form>
        <div className='list-container'>
        {todos.map((todo,i)=>
            (<div className='item-container'>
              <button className={status[i]==='pending'?'pending-btn btn':'done-btn btn'} onClick={()=>onPending(i)}>
                {status[i]==='pending'?'Pending':'✔️Done'}</button>
              <Todo title={i+1+'. '+todo} key={i}/>
              {status[i]==='pending'? <button className='remove-btn btn' onClick={()=>onRemove(i)}>Remove</button>:''}
            </div>)
        )}
        </div>
    </div>
  );
}

export default App;
