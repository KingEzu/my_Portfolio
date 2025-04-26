import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import AboutMe from "./pages/AboutMe";
import Projects from "./pages/Projects";
import ProjectView from "./pages/min-project/ViewProject";
import Footer from "./pages/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "./components/themeProvider";
import { ModeToggle } from "./components/mode-toggle";
import { Menu, X } from "lucide-react";
import "./App.css";
import PrivacyPolicy from "./pages/sub-componetnts/PrivacyPolicy";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <header className="header">
          <div className="nav-container">
            {/* Logo */}
            <div className="logo">
              <NavLink to="/" className="name-logo-container">
                <h1 className="namelogo">Ezu</h1>
              </NavLink>
            </div>

            {/* Navigation Links */}
            <nav className={`nav ${isMenuOpen ? "open" : ""}`}>
              <ul>
                <li>
                  <NavLink to="/AboutMe" className={({ isActive }) => (isActive ? "active-link" : "")} onClick={() => setIsMenuOpen(false)}>
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "")} onClick={() => setIsMenuOpen(false)}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/projects" className={({ isActive }) => (isActive ? "active-link" : "")} onClick={() => setIsMenuOpen(false)}>
                    Projects
                  </NavLink>
                </li>
              </ul>
            </nav>

            {/* Right Corner: Mode Toggle & Menu */}
            <div className="right-corner">
              <ModeToggle />
              <div className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} className="close-icon" /> : <Menu size={24} className="menu-icon" />}
              </div>
            </div>
          </div>
        </header>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AboutMe" element={<AboutMe />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project/:id" element={<ProjectView />} />
          <Route path="privacy-policy" element={<PrivacyPolicy/>}/>
        </Routes>

        <Footer />
        <ToastContainer position="bottom-right" theme="dark" />
      </Router>
    </ThemeProvider>
  );
}

export default App;
