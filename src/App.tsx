import { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import "./App.css";

const App: React.FC =() => {
  return (
    <AuthProvider>
      <Login/>
      <Home/>
    </AuthProvider>
  );
}

export default App;
