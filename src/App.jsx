import { useEffect, useState } from 'react'
import { getItems, updateItem } from './CrudFunctions';

function App() {
  
  const uri = 'http://localhost:5289/api/TodoItems/';
  const [todos, setTodos] = useState([]);
  const [newTodoName, setNewTodoName] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoName, setEditTodoName] = useState('');
  
  async function displayItems(uri) {
    try {
      const items = await getItems(uri);
      setTodos(items);
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
  const handleLongPress = (todo) => {
    setEditTodoId(todo.Id);
    setEditTodoName(todo.Name);
  };

  const handleEditChange = (e) => {
    setEditTodoName(e.target.value);
  };

  const handleFocusOff = () => {
    // updateItem(uri, todo.Id, { Id: todo.Id, Name: editTodoName, IsComplete: todo.IsComplete });
    setEditTodoId(null);
  };

  let timer;
  const startPressTimer = (todo) => {
    timer = setTimeout(() => handleLongPress(todo), 500); // fel masodperc, nem kell 500 masodpercig nyomni :)
  };

  const cancelPressTimer = () => {
    clearTimeout(timer);
  };

  const handleNewTodoKeyDown = (e) => {
    if (e.key === 'Enter') {
      addItem(uri, { Name: newTodoName, IsComplete: false });
      setNewTodoName('');
    }
  };

  const handleModifyKeyDown = (todo) => (e) => {
    if (e.key === 'Enter') {
      handleFocusOff(todo);
      updateItem(uri, todo.Id, { Id: todo.Id, Name: editTodoName, IsComplete: todo.IsComplete });
    }
  };

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
                {editTodoId === todo.Id ? (
                  <input 
                    type="text" 
                    className='edit-input'
                    value={editTodoName} 
                    onChange={handleEditChange} 
                    onBlur={() => handleFocusOff()}
                    onKeyDown={handleModifyKeyDown(todo)}
                    autoFocus
                  />
                ) : (
                  <label 
                    htmlFor={`checkbox-${todo.Id}`} 
                    onMouseDown={() => startPressTimer(todo)}
                    onMouseUp={cancelPressTimer}
                    onMouseLeave={cancelPressTimer}
                    onTouchStart={() => startPressTimer(todo)}
                    onTouchEnd={cancelPressTimer}
                  >
                    {todo.Name}
                  </label>
                )}
              </div>
              <button onClick={() => deleteItem(uri, todo.Id)}>Delete</button>
            </li>
          ))}
        </ul>
        
        

        <input 
        type="text" 
        value={newTodoName} 
        onChange={(e) => setNewTodoName(e.target.value)}
        onKeyDown={handleNewTodoKeyDown}

        />
        <button onClick={() => {

          addItem(uri, { Name: newTodoName, IsComplete: false })
          setNewTodoName('');
          }}>Add</button>
      </div>
    </>
  )
}

export default App
