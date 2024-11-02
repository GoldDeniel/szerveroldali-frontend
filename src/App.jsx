import { useEffect, useState } from 'react'
import { getItems } from './CrudFunctions';

function App() {
  
  const uri = 'http://localhost:5289/api/TodoItems';
  const [todos, setTodos] = useState([]);
  const [newTodoName, setNewTodoName] = useState('');

  async function displayItems(uri) {
    try {
      const items = await getItems(uri);
      console.log('Success:', items);
      setTodos(items); // Update the state with fetched items
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  }

  async function addItem(uri, item) {
    try {
      const response = await fetch(uri, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      });
      const data = await response.json();
      console.log('Success:', data);
      displayItems(uri);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    displayItems(uri);
  }, []);

  return (
    <>
      <div>
        <h1>Todo List</h1>
        <ul>
          {
          todos.map((todo) => (
            <li key={todo.Id}>
              <div className="checkbox-wrapper-11">
                <input id="02-11" type="checkbox" name="r" value="2"/>
                <label htmlFor="02-11">{todo.Name}</label>
              </div>
              <button onClick={() => deleteItem(uri, todo.Id)}>Delete</button>
            </li>
          ))}
        </ul>
        
        

        <input type="text" value={newTodoName} onChange={(e) => setNewTodoName(e.target.value)} />
        <button onClick={() => addItem(uri, { Name: newTodoName, IsComplete: false })}>Add</button>
      </div>
    </>
  )
}

export default App
