import "./App.css";
import Create from "./components/Create";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Read from "./components/Read";
import Update from "./components/Update";
import { Button } from "semantic-ui-react";
function App() {
  return (
    <>
      <Router>
        <div className="bg-dark">
          <h2 className="main-header">React Crud Application</h2>
          <Link to={"./"}>
            <Button>Create</Button>
          </Link>
          <Link to={"./read"}>
            <Button>Read</Button>
          </Link>

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
