import ReactDOM from "react-dom/client";
import "./index.css";
import { createContext, useContext, useState } from "react";

// Context
// A1.createContext [Provider,Consumer]=> ชื่อ Context
const ThemeContext = createContext();

// A1.สร้าง HOC : Higher Order Component (Provider)
// HOC คือ FC ที่รับ Component เข้าไปและ return Component ใหม่ออกมา
// function ThemeContextProvider(props) {
//   return <ThemeContext.Provider>{props.children}</ThemeContext.Provider>;
// }

/*
A2.Share Data &Logic ผ่าน arrtibutr value
=> Data(state,booleen,string,object,arrar etc.)
=> Logic(Fn ที่ใช้ handle ต่าง ๆ)
*/

// Data : isDarkMode,stylesObj
// Logic : setIsDarkMode,handleToggleTheme

function ThemeContextProvider(props) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const stylesObj = {
    backgroundColor: isDarkMode ? "black" : "white",
    color: isDarkMode ? "white" : "black",
  };

  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  const shareObj = { theme: stylesObj, toggleTheme: handleToggleTheme };
  return (
    <ThemeContext.Provider value={shareObj}>
      {props.children}
    </ThemeContext.Provider>
  );
}

/* A3.นำ Provider ไปครอบ Children
  <ThemeContextProvider>
    <App />
  </ThemeContextProvider>
*/

// ###################################

/* B1 : @Children Component ดึงค่า shared object ผ่านตัว  useContect


*/

// UI : Component
function App() {
  const s = useContext(ThemeContext);

  return (
    <div className="App" style={s.theme}>
      Theme App
      <button onClick={s.toggleTheme}>Toggle Theme</button>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeContextProvider>
    <App />
  </ThemeContextProvider>
);
