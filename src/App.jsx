import "./App.css";
import Create from "./components/Create";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Read from "./components/Read";
import Update from "./components/Update";

function App() {
  return (
    <>
      <Router>
        <div className="bg-dark">
          <h2 className="main-header">React Crud Application</h2>
          <div>
            <Routes>
              <Route path="/" element={<Create />} />
            </Routes>
            <Routes>
              <Route path="/read" element={<Read />} />
            </Routes>
            <Routes>
              <Route path="/update" element={<Update />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
