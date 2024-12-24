import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoutes";
import "./App.css";

const App: React.FC =() => {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route path="/"/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/home" element={<PrivateRoute><Home/></PrivateRoute>}/>
      </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
