import React, { useState, useEffect } from "react";
import Feed from "../comment-folder/feed";
import { auth } from "../../firebase";
import CreatePost from "../comment-folder/createPost";
import { Link,  useHistory } from "react-router-dom";
import { useAuth } from "../auth-context";
import {  Button, Nav, Navbar } from "react-bootstrap"

function CommentHome() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/home")
    } catch {
      setError("Failed to log out")
    }
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in...
        console.log(authUser);
        setUser(authUser);
        console.log("user has logged in");
      } else {
        // user has logged out..
        setUser(null);
        console.log("user has logged out");
      }
    });

    return () => {
      // perform some cleanup actions
      unsubscribe();
    };
  }, []);
  return (
    <div className="home">
      <Navbar id="Navbar" bg="primary" variant="dark">
    <Navbar.Brand href="#home"></Navbar.Brand>
     <Nav.Link id="NavLink" href="/create">Create New blog</Nav.Link>
      <Nav.Link id="NavLink" href="/comment-home">Create New Post</Nav.Link>
      <Button id="NavLink" variant="link" onClick={handleLogout}>
          Log Out
        </Button>
    <Nav className="mr-auto">
    </Nav>
  </Navbar>
  <center>
      <div user={user}/>

      <div className="app__body">
        {/* Upload Option */}
        <CreatePost user={user} />

        <Feed user={user} />
      </div>
      </center>
    </div>
  );
}

export default CommentHome;