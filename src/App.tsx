import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import '@mantine/core/styles.css';
import { MantineProvider } from "@mantine/core";
import "./App.css";

const App: React.FC =() => {
  return (
  
    <AuthProvider>
      <BrowserRouter>
      <MantineProvider>
      <Navbar/>
      <Routes>
      {/* <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>}/> */}
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/home" element={<Home/>}/>
      </Routes>
      </MantineProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
