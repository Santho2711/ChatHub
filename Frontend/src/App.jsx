import React, { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import { useThemeStore } from "./store/themeStore";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChatApp from "./pages/ChatApp";
import "./styles/App.css";

function App() {
  const { isAuthenticated, authView } = useAuthStore();
  const { primaryColor, secondaryColor, backgroundColor, textColor } =
    useThemeStore();

  useEffect(() => {
    // Apply theme variables to root
    const root = document.documentElement;
    root.style.setProperty("--primary-color", primaryColor);
    root.style.setProperty("--secondary-color", secondaryColor);
    root.style.setProperty("--background-color", backgroundColor);
    root.style.setProperty("--text-color", textColor);
  }, [primaryColor, secondaryColor, backgroundColor, textColor]);

  return (
    <div className="app-wrapper">
      {isAuthenticated ? (
        <ChatApp />
      ) : authView === "register" ? (
        <Register />
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
