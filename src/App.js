import { useState } from 'react';
import './App.css';
import Todo from './Todo';

function App() {

  const [input,setInput]=useState('');
  const [todos,setTodos]=useState([]);

  const addTodo=(e)=>{
    e.preventDefault();
    console.log('BOOM> ',input);
    setTodos([...todos,input]);
    console.log([...todos,input]);
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
