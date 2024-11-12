function BookItem({
  book,
  handleDeleteItem,
  handleModifyBook,
  isModifying,
}) {
  return (
    <li>
      <h2 className="book-item-spacing">{book.Name}</h2>
      <p className="book-item-spacing">{book.Category}</p>
      <p className="book-item-spacing">{book.Author}</p>
      <p className="book-item-spacing">{book.Price}</p>
      {!isModifying ? (
        <button
          className="book-item-spacing-button"
          onClick={() => {
            handleModifyBook(book);
          }}
        >
          Edit
        </button>
      ) : null}
      <button
       className="book-item-spacing-button"
       onClick={() => handleDeleteItem(book.Id)}>Delete</button>
    </li>
  );
}

export default BookItem;
