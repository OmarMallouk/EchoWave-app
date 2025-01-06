import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Mood from "./pages/Mood/Mood";
import Genre from "./pages/Genre/Genre";
import Channels from "./pages/AllChannels/Channels";
import Channel from "./pages/Channel/Channel";
import Originality from "./pages/Originality/Originality";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ui/ScrollToTop";
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
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mood" element={<Mood />} />
      <Route path="/genre" element={<Genre />} />
      <Route path="/origin" element={<Originality />} />
      <Route path="/channels" element={<Channels />} />
      <Route path="/channel" element={<Channel/>} />
      <Route path="/login" element={<ProtectedRoutes publicOnly><Login /></ProtectedRoutes>}/>
      <Route path="/register" element={<ProtectedRoutes publicOnly><Register /></ProtectedRoutes>}/>
      </Routes>
      <Footer/>
      </MantineProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
