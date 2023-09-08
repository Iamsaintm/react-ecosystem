import ReactDOM from "react-dom/client";
import "./index.css";
import { useState } from "react";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  const stylesObj = {
    backgroundColor: isDarkMode ? "black" : "white",
    color: isDarkMode ? "white" : "black",
  };
  return (
    <div className="App" style={stylesObj}>
      Theme App
      <button onClick={handleToggleTheme}>Toggle Theme</button>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
