import { useEffect, useState } from "react";
import { postItem, deleteItem, getItems } from "./CrudFunctions";
import React from "react";

function UserApp() {
  const [uri, setUri] = useState("http://localhost:5289/api/User/");

  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [myId, setMyId] = React.useState(null);
  const [isSuccessfulLogin, setIsSuccessfulLogin] = React.useState(null);
  const [loginMessage, setLoginMessage] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const [friends, setFriends] = React.useState([]);

  function clearFields() {
    setName("");
    setPassword("");
  }

  function logout() {
    setMyId(null);
    setIsSuccessfulLogin(null);
    setLoginMessage("");
    clearFields();
  }

  function updateFriends() {
    const URI = uri + "friends/" + myId;
    getItems(URI).then((data) => {
      console.log("Friends:", data);
    }
    ).catch((error) => {
      console.error("Error getting friends items:", error);
    }
    );
  }

  function updateUsers() {
    getItems(uri).then((data) => {
      setUsers(data);
    }).catch((error) => {
      console.error("Error getting users items:", error);
    });
  }

  function login() {
    let user = postItem(uri + "login", { Name: name, Secret: password }).then(
      (data) => {
        if (data) {
          setMyId(data.Id);
          setIsSuccessfulLogin(true);
          setLoginMessage("Login successful");
          clearFields();
        } else {
          setIsSuccessfulLogin(false);
          setLoginMessage("Login failed: Invalid username or password");
        }
      }
    );
  }

  function register() {
    const URI = uri + "register";
    postItem(URI, { Name: name, Secret: password }).then((data) => {
      if (data) {
        setIsSuccessfulLogin(true);
        setLoginMessage("Registration successful");
        clearFields();
        updateData();
      } else {
        setIsSuccessfulLogin(false);
        setLoginMessage("Registration failed: Invalid username or password");
      }
    });
  }

  function updateData() {
    setUsers([]);
    setFriends([]);
    
    if (myId) {
      updateFriends();
    }
    updateUsers();
  }

  useEffect(() => {
    // update data
    updateData();
  }, [myId, uri]);

  return (
    <div>
      <div className="modeSwitchContainer">
        {uri}
        <br />

        <div className="checkbox-wrapper-63 modeSwitchContainer">
          <label className="switch">
            <input
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  setUri("http://localhost:5289/api/BetterUser/");
                  logout();
                  clearFields();
                } else {
                  setUri("http://localhost:5289/api/User/");
                  logout();
                  clearFields();
                }
              }}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      {
        // is user logged in
        myId == null ? (
          <div>
            <h1>Login</h1>
            <input
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button
              className="book-item-spacing-button"
              onClick={() => login()}
            >
              Login
            </button>
            <button
              className="book-item-spacing-button"
              onClick={() => register()}
            >
              Register
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          </div>
        )
      }
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
        {users.map((user) =>
          user.Id === myId ? null : (
            <li key={user.Id}>
              {user.Name}
              {friends.find((friend) => friend.Id === user.Id) ? (
                <span> (Friend)</span>
              ) : (
                <button
                  onClick={() => {
                    handleAddFriend(user.Id);
                  }}
                >
                  Add Friend
                </button>
              )}

              <button
                onClick={() => {
                  handleDeleteUser(user.Id);
                }}
              >
                Delete
              </button>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default UserApp;
