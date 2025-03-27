//App component
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Navbar } from "../../client-test/src/components/Navbar";
import "./App.css";
import AboutPage from "./components/About";
import Potd from "./components/Challenges";
import Footer from "./components/footer";
import Home from "./components/Home";
import Leaderboard from "./components/leaderboard";
import LoginPage from "./components/Login";
import ProfilePage from "./components/ProfilePage";
import RegisterPage from "./components/SignUp";
function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/challenges" element={<Potd />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
