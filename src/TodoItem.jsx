import React from 'react';

function TodoItem({
  todo,
  editTodoId,
  editTodoName,
  handleEditChange,
  handleFocusOff,
  handleModifyKeyDown,
  startPressTimer,
  cancelPressTimer,
  handleModifyCheck,
  handleDeleteItem
}) {
  return (
    <li key={todo.Id}>
      <div className="checkbox-wrapper-11">
        <input 
          id={`checkbox-${todo.Id}`} 
          type="checkbox" 
          name="r" 
          value="2" 
          checked={todo.IsComplete} 
          onChange={() => handleModifyCheck(todo)} 
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
      <button onClick={() => handleDeleteItem(todo.Id)}>Delete</button>
    </li>
  );
}

export default TodoItem;