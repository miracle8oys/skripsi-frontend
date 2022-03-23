import { BrowserRouter, Route, Routes } from "react-router-dom";
import Csv from "./pages/Csv";
import Main from "./pages/Main";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/csv" element={<Csv />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
