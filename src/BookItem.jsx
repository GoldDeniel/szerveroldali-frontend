function BookItem({
  book,
  handleDeleteItem,
  setIsModifying,
  isModifying,
  setBookToModify,
}) {
  return (
    <li>
      <h2>{book.Name}</h2>
      <p>{book.Category}</p>
      <p>{book.Author}</p>
      <p>{book.Price}</p>
      {!isModifying ? (
        <button
          onClick={() => {
            setIsModifying(true);
            setBookToModify(book);
          }}
        >
          Edit
        </button>
      ) : null}
      <button onClick={() => handleDeleteItem(book.Id)}>Delete</button>
    </li>
  );
}

export default BookItem;
