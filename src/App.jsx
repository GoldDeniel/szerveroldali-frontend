import { useEffect, useState } from 'react'
import { getItems, updateItem } from './CrudFunctions';

function App() {
  
  const uri = 'http://localhost:5289/api/TodoItems/';
  const [todos, setTodos] = useState([]);
  const [newTodoName, setNewTodoName] = useState('');

  async function displayItems(uri) {
    try {
      const items = await getItems(uri);
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
      displayItems(uri);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function deleteItem(uri, id) {
    try {
      const response = await fetch(`${uri}${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        displayItems(uri);
      } else {
        console.error('Error: Failed to delete item');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function updateItem(uri, id, item) {
    try {
      const response = await fetch(`${uri}${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      });

      if (response.ok) {
        displayItems(uri);
      }
    }
    catch (error) {
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
              <input 
                  id={`checkbox-${todo.Id}`} 
                  type="checkbox" 
                  name="r" 
                  value="2" 
                  checked={todo.IsComplete} 
                  onChange={() => {
                    updateItem(uri, todo.Id, {Id: todo.Id, Name: todo.Name, IsComplete: !todo.IsComplete });
                  }} 
                />
                <label htmlFor={`checkbox-${todo.Id}`}>{todo.Name}</label>
              </div>
              <button onClick={() => deleteItem(uri, todo.Id)}>Delete</button>
            </li>
          ))}
        </ul>
        
        

        <input type="text" value={newTodoName} onChange={(e) => setNewTodoName(e.target.value)} />
        <button onClick={() => {

          addItem(uri, { Name: newTodoName, IsComplete: false })
          setNewTodoName('');
          }}>Add</button>
      </div>
    </>
  )
}

export default App
