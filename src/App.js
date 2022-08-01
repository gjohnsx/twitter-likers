import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Users from "./components/Users";

export default function App() {
  return (
    <Router>
      <div className="min-h-full">
        <Navbar />
             
        <main>
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </main>
      </div>


    </Router>
  )
}
