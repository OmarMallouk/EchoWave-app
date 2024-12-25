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
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<ProtectedRoutes publicOnly><Login /></ProtectedRoutes>}/>
      <Route path="/register" element={<ProtectedRoutes publicOnly><Register /></ProtectedRoutes>}/>
      </Routes>
      </MantineProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
