import { useEffect, useState } from 'react'
import { getItems, updateItem, addItem, deleteItem } from './CrudFunctions';
import TodoItem from './TodoItem';

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
      addItem(uri, { Name: newTodoName, IsComplete: false }).then(() => displayItems(uri));
      setNewTodoName('');
    }
  };

  const handleModifyKeyDown = (todo) => (e) => {
    if (e.key === 'Enter') {
      handleFocusOff(todo);
      updateItem(uri, todo.Id, { Id: todo.Id, Name: editTodoName, IsComplete: todo.IsComplete });
    }
  };

  const handleDeleteItem = (id) => {
    deleteItem(uri, id).then(() => displayItems(uri));
  }

  const handleAddItem = (item) => {
    if (!item.Name || item.Name === '') {
      return;
    }
    addItem(uri, item).then(() => displayItems(uri));
    setNewTodoName('');
  }

  const handleModifyCheck = (todo) => {
    updateItem(uri, todo.Id, { Id: todo.Id, Name: todo.Name, IsComplete: !todo.IsComplete }).then(() => displayItems(uri));
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
            <TodoItem
              key={todo.Id}
              todo={todo}
              editTodoId={editTodoId}
              editTodoName={editTodoName}
              handleEditChange={handleEditChange}
              handleFocusOff={handleFocusOff}
              handleModifyKeyDown={handleModifyKeyDown}
              startPressTimer={startPressTimer}
              cancelPressTimer={cancelPressTimer}
              handleModifyCheck={handleModifyCheck}
              handleDeleteItem={handleDeleteItem}
            />
          ))}
        </ul>
        
        <input 
        type="text" 
        value={newTodoName} 
        onChange={(e) => setNewTodoName(e.target.value)}
        onKeyDown={handleNewTodoKeyDown}
        />
        <button onClick={() => {
          handleAddItem({ Name: newTodoName, IsComplete: false });
          }}>Add</button>
      </div>
    </>
  )
}

export default App
