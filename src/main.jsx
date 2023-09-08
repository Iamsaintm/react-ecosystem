import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";

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
      // console.log(response.data);
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

function ProfilePage() {
  return <div className="App">Profile Page</div>;
}

function FriendPage() {
  const { userId } = useParams();
  const [friend, setFriend] = useState(null);
  const fetchFriendDetail = async () => {
    try {
      const { data } = await axios.get(`/users/${userId}`);
      // console.log(data);
      setFriend(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFriendDetail();
  }, []);
  return (
    <div className="App">
      {friend && (
        <div className="friend">
          <h3>{friend.name}</h3>
        </div>
      )}
    </div>
  );
}

function FeedPage() {
  return <div className="App">Feed Page</div>;
}

function AppLayout() {
  return (
    <>
      <div>
        <Link to="/">home</Link>
        <Link to="/profile">profile</Link>
        <Link to="/profile/5">friend</Link>
        <Link to="/feed">feed</Link>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      {/* Parent */}
      <Route path="/" element={<AppLayout />}>
        {/* Child */}
        <Route path="" element={<HomePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="profile/:userId" element={<FriendPage />} />
        <Route path="feed" element={<FeedPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

/*
<BrowserRouter>
    <Link to="/">home</Link>
    <Link to="/profile">profile</Link>
    <Link to="/profile/5">friend</Link>
    <Link to="/feed">feed</Link>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/:userId" element={<FriendPage />} />
      <Route path="/feed" element={<FeePage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
*/
