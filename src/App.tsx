import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoutes";
import "./App.css";

const App: React.FC =() => {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login/>}/>

      <Route path="/home" element={<PrivateRoute><Home/></PrivateRoute>}/>
      </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
