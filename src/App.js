import { BrowserRouter, Route, Routes } from "react-router-dom";
import Csv from "./pages/Csv";
import History from "./pages/History";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Navbar from "./pages/Navbar";
import Register from "./pages/Register";

function App() {

  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/manual" element={<Main />} />
        <Route path="/csv" element={<Csv />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
