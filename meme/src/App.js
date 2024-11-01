import React, { useState, createContext, useContext } from "react";
import Header from "./components/header";
import Nav from "./components/nav";
import Main from "./components/main";
import Footer from "./components/footer";
import "./App.css";

// Create a Theme Context
export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app ${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <Header />
      <Nav />
      <Main />
      <Footer />
    </ThemeProvider>
  );
};

export default App;
