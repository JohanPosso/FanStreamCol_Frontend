import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfileComponent from "./components/ProfileComponent";
import HomeComponent from "./components/HomeComponent";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/profile/:id" element={<ProfileComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
