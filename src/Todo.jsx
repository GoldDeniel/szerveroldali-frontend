import React, { useState } from 'react';
import { getItems, addItem, deleteItem, updateItem } from './CrudFunctions';
import { getMongoDbConnectionString } from './ConnectionStrings';
export default function Todo({ name, onDelete, onEdit }) {
  const [isChecked, setIsChecked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(name);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);

    const item = {
        name: name,
        isComplete: !isChecked,
        };
    handleUpdate(name, item);

  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);

    const item = {
        name: e.target.value,
        isComplete: isChecked,
        };
    handleUpdate(name, item);


  };

  const handleEditClick = () => {
    if (isEditing) {
      onEdit(editValue);
    }
    setIsEditing(!isEditing);
  };

  const handleUpdate = (id, item) => {
    updateItem(getMongoDbConnectionString(), id, item);
  }

  return (
    <div>
      <input 
        type="checkbox" 
        checked={isChecked} 
        onChange={handleCheckboxChange} 
      />
      {isEditing ? (
        <input 
          type="text" 
          value={editValue} 
          onChange={handleEditChange} 
        />
      ) : (
        <span>{name}</span>
      )}
      <button onClick={handleEditClick}>
        {isEditing ? 'Save' : 'Edit'}
      </button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}