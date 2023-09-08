import ReactDOM from "react-dom/client";
import "./index.css";
import { createContext, useContext, useState } from "react";

// AuthContext
const AuthContext = createContext();

function AuthContextProvider(props) {
  const [isAuth, setIsAuth] = useState(false);
  const handleAuth = () => {
    setIsAuth(!isAuth);
  };
  const shareObj = { toggleAuth: handleAuth, isAuth: isAuth };
  return (
    <AuthContext.Provider value={shareObj}>
      {props.children}
    </AuthContext.Provider>
  );
}

function App() {
  const auth = useContext(AuthContext);

  return (
    <div className="App">
      <h3>Welocome.. {auth.isAuth ? "Guest" : "User"}</h3>
      <button onClick={auth.toggleAuth}>
        {auth.isAuth ? "Login" : "Logout"}
      </button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
