import React, { useEffect } from "react";
import { ConnectionStrings } from "../utils/ConnectionStrings";
import { updateItem, postItem, deleteItem, getItems } from "../utils/CrudFunctions";
import BookItem from "./BookItem";
function BookStoreApp() {
  const uri = ConnectionStrings.BookStoreUri;
  
  const [newBookName, setNewBookName] = React.useState("");
  const [newBookAuthor, setNewBookAuthor] = React.useState("");
  const [newBookPrice, setNewBookPrice] = React.useState("");
  const [newBookCategory, setNewBookCategory] = React.useState("");

  const [books, setBooks] = React.useState([]);
  const [filteredBooks, setFilteredBooks] = React.useState([]);
  const [isModifying, setIsModifying] = React.useState(false);
  const [bookToModify, setBookToModify] = React.useState(null);

  const [searchBoxText , setSearchBoxText] = React.useState("");

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
        setFilteredBooks(data);
      });
    });
  };

  const handleModifyBook = (book) => {
    setNewBookName(book.Name);
    setNewBookAuthor(book.Author);
    setNewBookPrice(book.Price);
    setNewBookCategory(book.Category);
    
    setIsModifying(true);
    setBookToModify(book);
  };

  const handleSearch = (text) => {
    setSearchBoxText(text);
    // text is in name or author or category
    setFilteredBooks(books.filter(book => 
      book.Name.toLowerCase().includes(text.toLowerCase()) ||
      book.Author.toLowerCase().includes(text.toLowerCase()) ||
      book.Category.toLowerCase().includes(text.toLowerCase())));
  }

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
      alert("Book name, author and price are required");
      return;
    }

    postItem(uri, book)
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
      setFilteredBooks(data);
    }).catch((error) => {
      alert(error);
    });
  }, []);

  useEffect(() => {
    setFilteredBooks(books);
  }
  , [books]);


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
          className="book-item-spacing-button"
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
          <>
          
            <button
            className="book-item-spacing-button"
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
            <legend>
            <hr/>
            <input
              type="text"
              value={searchBoxText}
              placeholder="Search"
              onChange={(e) => handleSearch(e.target.value)}
              />
              </legend>
          </>
        )}
      </div>

      {isModifying && bookToModify ? (
        <div className="bookToModifyDiv">
          <h2 className="book-item-spacing">{bookToModify.Name}</h2>
          <p className="book-item-spacing">{bookToModify.Category}</p>
          <p className="book-item-spacing">{bookToModify.Author}</p>
          <p className="book-item-spacing">{bookToModify.Price}</p>
        </div>
      ) : (
        <div>
          <h2>Books</h2>
          <ul>
            {filteredBooks.map((book, index) => (
              <BookItem
                key={index}
                book={book}
                handleDeleteItem={handleDeleteItem}
                handleModifyBook={handleModifyBook}
                isModifying={isModifying}
                
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default BookStoreApp;
