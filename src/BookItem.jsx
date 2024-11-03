

function BookItem({ book, handleDeleteItem }) {
  return (
    <li>
      <h2>{book.Name}</h2>
        <p>{book.Category}</p>
      <p>{book.Author}</p>
        <p>{book.Price}</p>
        <button onClick={() => handleDeleteItem(book.Id)}>Delete</button>
    </li>
  );
}

export default BookItem;