import { useEffect, useState } from "react";
import { addItem, deleteItem, getItems } from "./CrudFunctions";
import React from "react";

function UserApp() {
  const [uri, setUri] = useState("http://localhost:5289/api/User/");
  const [name, setName] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [myId, setMyId] = React.useState(null);
  const [isSuccessfulLogin, setIsSuccessfulLogin] = React.useState(null);
  const [loginMessage, setLoginMessage] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const [friends, setFriends] = React.useState([]);
 
  function updateFriends(){
    const URI = uri + "/"
  }

  function updateUsers(){

  }


  function updateData(){
    setFriends([]);
    setUsers([]);


  }

  useEffect(() => {
    // update data

  }, [myId, uri]);

  return (
    <div>
      <div className="modeSwitchContainer">
        {uri}
        <br/>
            <div className="checkbox-wrapper-63 modeSwitchContainer">
            <label className="switch">
                <input type="checkbox"  onClick={() => {
                    setIsTodoShown(!isTodoShown);
                    }}/>
                <span className="slider"></span>
            </label>
            </div>
        </div>
      <div>
        <h1>Login</h1>

        <input
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          className="book-item-spacing-button"
          onClick={() => handleLogin()}
        >
          Login
        </button>
        <button
          className="book-item-spacing-button"
          onClick={() => handleRegister()}
        >
          Register
        </button>
      </div>
      <div>
        {isSuccessfulLogin == null ? null : (
          <span
            style={{
              color: isSuccessfulLogin === true ? "green" : "red",
            }}
          >
            {loginMessage}
          </span>
        )}
      </div>
      <h1>Friends</h1>

        <ul>
            {friends.map((friend) => (
                <li key={friend.Id}>
                    {friend.Name}
                    <button
                    onClick={() => {
                        handleRemoveFriend(friend.Id);
                    }}
                    >
                    Remove Friend
                    </button>

                </li>
            ))}
        </ul>

      <h1>Users</h1>
      <ul>
        {users.map((user) => (
        user.Id === myId ? null :
          <li key={user.Id}>
            {user.Name}
            {
                friends.find((friend) => friend.Id === user.Id) ? (
                    <span> (Friend)</span>
                ) : <button
                onClick={() => {
                  handleAddFriend(user.Id);
                }}
              >
                Add Friend
              </button>
            }
            
            <button
              onClick={() => {
                handleDeleteUser(user.Id);
              }}
            >
              Delete
            </button>
          </li>

        ))}
      </ul>
    </div>
  );
}

export default UserApp;
