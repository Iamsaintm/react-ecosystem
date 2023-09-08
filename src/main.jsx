import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

function HomePage() {
  const [friend, setFriend] = useState([]);

  const fetchFriend = async () => {
    try {
      const response = await axios.get("/users");
      console.log(response.data);
      setFriend(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchFriend();
  }, []);
  return (
    <div className="App">
      <h1>Home Page</h1>
      {/* <button onClick={fetchFriend}>Get FriendList</button> */}
    </div>
  );
}

function Profile() {
  return <div className="App">Profile Page</div>;
}

function Friend() {
  return <div className="App">Friend Page</div>;
}

function Feed() {
  return <div className="App">Feed Page</div>;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Link to="/">home</Link>
    <Link to="/profile">profile</Link>
    <Link to="/profile/5">friend</Link>
    <Link to="/feed">feed</Link>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/:id" element={<Friend />} />
      <Route path="/feed" element={<Feed />} />
    </Routes>
  </BrowserRouter>
);
