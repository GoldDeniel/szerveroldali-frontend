import { updateItem } from "./CrudFunctions";
import BookItem from "./BookItem";
import React from "react";
import { useState } from "react";

function EditBook (book, uri, displayItems) {

    const [newBookName, setNewBookName] = useState('');
    const [newBookAuthor, setNewBookAuthor] = useState('');
    const [newBookPrice, setNewBookPrice] = useState('');
    const [newBookCategory, setNewBookCategory] = useState('');


    return (
        <div>
            <div>
                <BookItem key={index} book={book} handleDeleteItem={null} />
            </div>
            <div>
                <input
                type="text"
                value={newBookName}
                onChange={(e) => setNewBookName(e.target.value)}
                placeholder='Book Name'
                />
                <input
                type='text'
                value={newBookCategory}
                onChange={(e) => setNewBookCategory(e.target.value)}
                placeholder='Category'
                />
                <input
                type='text'
                value={newBookAuthor}
                onChange={(e) => setNewBookAuthor(e.target.value)}
                placeholder='Author'
                />
                <input
                type='number'
                value={newBookPrice}
                onChange={(e) => setNewBookPrice(e.target.value)}
                placeholder='Price'
                />
                <button onClick={() => {
                if (!newBookName || newBookName === '' || !newBookAuthor || newBookAuthor === '' || !newBookPrice || newBookPrice === '' || !newBookCategory || newBookCategory === '') {
                    return;
                }

                updateItem(uri, book.Id, { Id: book.Id, Name: newBookName, Author: newBookAuthor, Price: newBookPrice, Category: newBookCategory }).then(() => displayItems(uri));
                }}>Add</button>
            </div>
        </div>
    );
}
export default EditBook;