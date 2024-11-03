import { useState } from "react";
import TodoApp from "./TodoApp";
import BookStoreApp from "./BookStoreApp";
function App() {

    const [isTodoShown, setIsTodoShown] = useState(false);

  return (
    <div>

        <div className="modeSwitchContainer">
            <h2>Todo</h2>
            <div class="checkbox-wrapper-63 modeSwitchContainer">
            <label class="switch">
                <input type="checkbox"  onClick={() => {
                    setIsTodoShown(!isTodoShown);
                    }}/>
                <span class="slider"></span>
            </label>
            </div>
            <h2>Book Store</h2>
        </div>

        
        {!isTodoShown ? 
        <TodoApp /> : 
        <BookStoreApp/>}
    </div>

  );
}

export default App;



