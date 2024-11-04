import React, { useEffect } from "react";
import { updateItem, addItem, deleteItem, getItems } from "./CrudFunctions";
import BookItem from "./BookItem";
function BookStoreApp() {
  const uri = "http://localhost:5289/api/Books/";
  const [newBookName, setNewBookName] = React.useState("");
  const [newBookAuthor, setNewBookAuthor] = React.useState("");
  const [newBookPrice, setNewBookPrice] = React.useState("");
  const [newBookCategory, setNewBookCategory] = React.useState("");
  const [books, setBooks] = React.useState([]);

  const [isModifying, setIsModifying] = React.useState(false);
  const [bookToModify, setBookToModify] = React.useState(null);

  const handleNewBookKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddItem({
        Name: newBookName,
        Author: newBookAuthor,
        Price: newBookPrice,
      });
    }
  };

  const clearFields = () => {
    setNewBookName("");
    setNewBookAuthor("");
    setNewBookPrice("");
    setNewBookCategory("");
  }

  const handleDeleteItem = (id) => {
    deleteItem(uri, id).then(() => {
      getItems(uri).then((data) => {
        setBooks(data);
      });
    });
  };

  const handleAddItem = (book) => {
    if (
      !book.Name ||
      book.Name === "" ||
      !book.Author ||
      book.Author === "" ||
      !book.Price ||
      book.Price === "" ||
      !book.Category ||
      book.Category === ""
    ) {
      console.error("Book name, author and price are required");
      return;
    }

    addItem(uri, book)
      .then(() => {
        getItems(uri).then((data) => {
          setBooks(data);
        });
      })
      .then(() => {
        clearFields();
      });
  };

  useEffect(() => {
    getItems(uri).then((data) => {
      setBooks(data);
    });
  }, []);

  return (
    <div>
      <h1>Book Store App</h1>

      <div>
        <input
          type="text"
          value={newBookName}
          onChange={(e) => setNewBookName(e.target.value)}
          onKeyDown={handleNewBookKeyDown}
          placeholder="Book Name"
        />

        <input
          type="text"
          value={newBookCategory}
          onChange={(e) => setNewBookCategory(e.target.value)}
          onKeyDown={handleNewBookKeyDown}
          placeholder="Category"
        />

        <input
          type="text"
          value={newBookAuthor}
          onChange={(e) => setNewBookAuthor(e.target.value)}
          onKeyDown={handleNewBookKeyDown}
          placeholder="Author"
        />

        <input
          type="number"
          value={newBookPrice}
          onChange={(e) => setNewBookPrice(e.target.value)}
          onKeyDown={handleNewBookKeyDown}
          placeholder="Price"
        />
        {isModifying && bookToModify ? (
          <button
            onClick={() => {

                let new_book_name = newBookName ? newBookName : bookToModify.Name;
                let new_book_author = newBookAuthor ? newBookAuthor : bookToModify.Author;
                let new_book_price = newBookPrice ? newBookPrice : bookToModify.Price;
                let new_book_category = newBookCategory ? newBookCategory : bookToModify.Category;

              updateItem(uri, bookToModify.Id, {
                Id: bookToModify.Id,
                Name: new_book_name,
                Author: new_book_author,
                Price: new_book_price,
                Category: new_book_category,
              }).then(() => {
                getItems(uri).then((data) => {
                  setBooks(data);
                });
                setBookToModify(null);
                setIsModifying(false);
                clearFields();
              });
            }}
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => {
              handleAddItem({
                Name: newBookName,
                Author: newBookAuthor,
                Price: newBookPrice,
                Category: newBookCategory,
              });
            }}
          >
            Add
          </button>
        )}
      </div>

      {isModifying && bookToModify ? (
        <div className="bookToModifyDiv">
          <h2>{bookToModify.Name}</h2>
          <p>{bookToModify.Category}</p>
          <p>{bookToModify.Author}</p>
          <p>{bookToModify.Price}</p>
        </div>
      ) : (
        <div>
          <h2>Books</h2>
          <ul>
            {books.map((book, index) => (
              <BookItem
                key={index}
                book={book}
                handleDeleteItem={handleDeleteItem}
                setIsModifying={setIsModifying}
                isModifying={isModifying}
                setBookToModify={setBookToModify}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default BookStoreApp;
