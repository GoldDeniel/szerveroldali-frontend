import { useState } from "react";
import TodoApp from "./TodoApp";
import UserApp from "./UserApp";
import BookStoreApp from "./BookStoreApp";
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
