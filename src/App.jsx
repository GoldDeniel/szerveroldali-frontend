import { useState } from "react";
import TodoApp from "./Todo/TodoApp";
import UserApp from "./User/UserApp";
import BookStoreApp from "./BookStore/BookStoreApp";
function App() {
  const [shownPage, setShownPage] = useState("UserApp");
  return (
    <div>
      <div  className="page-buttons-container">
        <button
        className="page-button"
          onClick={() => {
            setShownPage("Todo");
          }}
        >
          Todo
        </button>
        <button className="page-button" onClick={() => {
            setShownPage("UserApp");
          }}>User App</button>
        <button className="page-button" onClick={() => {
            setShownPage("BookStoreApp");
          }}>BookStore App</button>
      </div>
      <div>
        {shownPage == "UserApp" ? (
          <UserApp />
        ) : shownPage == "BookStoreApp" ? (
          <BookStoreApp />
        ) : (
          <TodoApp />
        )}
      </div>
    </div>
  );
}

export default App;
