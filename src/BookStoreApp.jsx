import React, { useEffect } from 'react';
import { updateItem, addItem, deleteItem, getItems } from './CrudFunctions';
import BookItem from './BookItem';
function BookStoreApp() {

    const uri = 'http://localhost:5289/api/Books/';
    const [newBookName, setNewBookName] = React.useState('');
    const [newBookAuthor, setNewBookAuthor] = React.useState('');
    const [newBookPrice, setNewBookPrice] = React.useState('');
    const [newBookCategory, setNewBookCategory] = React.useState('');
    const [books, setBooks] = React.useState([]);

    const handleNewBookKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAddItem({ Name: newBookName, Author: newBookAuthor, Price: newBookPrice });
        }
    }

    const handleDeleteItem = (id) => {
        deleteItem(uri, id).then(() => {
            getItems(uri).then((data) => {
                setBooks(data);
            });
        });
    }

    const handleAddItem = (book) => {
        if (!book.Name || book.Name === '' || !book.Author || book.Author === '' || !book.Price || book.Price === '' || !book.Category || book.Category === '') {
            console.error('Book name, author and price are required');
            return;
        }

        addItem(uri, book).then(() => {
            getItems(uri).then((data) => {
                setBooks(data);
            });
        }
        ).then(() => { 
            setNewBookName(''); 
            setNewBookAuthor(''); 
            setNewBookPrice(''); 
        });



    }

    useEffect(() => {
        
        getItems(uri).then((data) => {
            setBooks(data);
        });

    }
    , []);

    return (
    <div>
      <h1>Book Store App</h1>
      
        <div>
            <input 
            type="text" 
            value={newBookName} 
            onChange={(e) => setNewBookName(e.target.value)}
            onKeyDown={handleNewBookKeyDown}
            placeholder='Book Name'
            />

            <input
            type='text'
            value={newBookCategory}
            onChange={(e) => setNewBookCategory(e.target.value)}
            onKeyDown={handleNewBookKeyDown}
            placeholder='Category'
            />

            <input
            type='text'
            value={newBookAuthor}
            onChange={(e) => setNewBookAuthor(e.target.value)}
            onKeyDown={handleNewBookKeyDown}
            placeholder='Author'
            />

            <input
            type='number'
            value={newBookPrice}
            onChange={(e) => setNewBookPrice(e.target.value)}
            onKeyDown={handleNewBookKeyDown}
            placeholder='Price'
            />

            <button onClick={() => {
            handleAddItem({ Name: newBookName, Author: newBookAuthor, Price: newBookPrice, Category: newBookCategory });
            }}>Add</button>
        </div>
        <div>
            <h2>Books</h2>
            <ul>
               {
                books.map((book, index) => (
                    <BookItem key={index} book={book} handleDeleteItem={handleDeleteItem} />
                ))
               }
            </ul>
        </div>
    </div>
  );
}

export default BookStoreApp;