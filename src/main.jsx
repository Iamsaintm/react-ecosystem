import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

function HomePage() {
  const [friend, setFriend] = useState([]);
  const navigate = useNavigate();

  const handleNavigate = (userId) => {
    if (userId == 1) {
      navigate("/profile");
    } else {
      navigate(`/profile/${userId}`);
    }
  };

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
      {friend.map((f) => (
        <div
          className="friend"
          key={f.id}
          onClick={() => {
            handleNavigate(f.id);
          }}
        >
          <h3>{f.name}</h3>
          <h5>
            {f.email}, {f.phone}
          </h5>
        </div>
      ))}
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
