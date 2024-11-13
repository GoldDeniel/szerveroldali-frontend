import { useEffect } from "react";
import { addItem, deleteItem, getItems } from "./CrudFunctions";
import React from "react";

function UserApp() {
  const uri = "http://localhost:5289/api/User/";
  const [name, setName] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [myId, setMyId] = React.useState(null);
  const [isSuccessfulLogin, setIsSuccessfulLogin] = React.useState(null);
  const [loginMessage, setLoginMessage] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const [friends, setFriends] = React.useState([]);
  function handleLogin() {
    let URI = uri + "login";
    const response = fetch(URI, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ Name: name, Secret: password }),
        })
        .then(async (response) => {
            if (response.ok) {
            setIsSuccessfulLogin(true);
            await response.json().then((d) => {
                setLoginMessage("Login successful");
                setMyId(d.Id);
                console.log("My id: " + myId);
                handleGetFriends();
            });
            } else {
            setIsSuccessfulLogin(false);
            setLoginMessage("Login failed");
            setMyId(null);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
  }
  function handleDeleteUser(id) {
    deleteItem(uri, id).then(() => {
      refreshData();
    });
  }
  function handleRegister() {
    let URI = uri + "register";
    addItem(URI, { Name: name, Secret: password }).then(() => {
      refreshData();
    });
  }
  function handleRemoveFriend(friendId) {
    if (!myId) {
        return;
    }
    let URI = uri + "removefriend/" + myId + "/" + friendId;
    addItem(URI).then(() => {
        handleGetFriends();
    });
    }
  function handleGetFriends() {
    console.log("Getting friends");
    if (!myId) {
      return;
    }
    let URI = uri + "friends/" + myId;
    getItems(URI).then((data) => {
        console.log("Friends:");
      setFriends(data);
    });
  }

  function refreshData() {
    handleGetFriends();
    getItems(uri).then((data) => {
        setUsers(data);
        }
    );
  }
  function handleAddFriend(friendId) {
    if (!isSuccessfulLogin || !myId || !friendId) {
      return;
    }
    let URI = uri + "addfriend/" + myId + "/" + friendId;
    addItem(URI, { id: myId, friendId: friendId }).then(() => {
      handleGetFriends();
    });
  }

  useEffect(() => {
    refreshData();
  }, [myId]);

  return (
    <div>
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
