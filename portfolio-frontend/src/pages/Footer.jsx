import React, { useState, useEffect } from "react";
import { Github, Linkedin, Mail, MapPin, Phone, X, ArrowUp, ArrowDown } from "lucide-react";
import { useTheme } from "../components/themeProvider";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import "../App.css";

const Footer = () => {
  const [user, setUser] = useState({});
  const { theme } = useTheme();
  const [showArrows, setShowArrows] = useState({ up: false, down: true });
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getMyProfile = async () => {
      try {
        const { data } = await axios.get("https://mern-stack-portfolio-backend-code-7m37.onrender.com/api/v1/user/me", { withCredentials: true });
        setUser(data.user);
      } catch (error) {
        console.error("Failed to fetch user data:", error.message);
      }
    };
    getMyProfile();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const bottomReached = window.innerHeight + scrollPosition >= document.documentElement.scrollHeight;
      setShowArrows({
        up: scrollPosition > 100,
        down: !bottomReached,
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToBottom = () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });

  const handleSubscribe = async () => {
    if (!email) {
      toast.error("Please enter an email address!");
      return;
    }

    try {
      const response = await axios.post("https://mern-stack-portfolio-backend-code-7m37.onrender.com/api/v1/newsletter/subscribe", { email });
      if (response.status === 201) {
        toast.success("Subscribed successfully!");
        setEmail("");
        setIsSubmitted(true); // Optional, show confirmation after subscribing
       
      }
    } catch (error) {
      console.error("Subscription failed:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Failed to subscribe. Try again.");
    }
  };

  return (
    <footer className={`p-8 bg-gradient-to-r ${theme === 'dark' ? 'from-gray-800 to-gray-900' : 'from-gray-100 to-gray-200'} text-gray-800 dark:text-white relative border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
      
      {/* Main Footer Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-x-20 px-8 mb-8">
        
        {/* Left Section */}
        <div className="flex flex-col items-center md:items-start space-y-4 mt-3">
          <h1 className="text-2xl font-bold">Ezu</h1>
          <div className="flex space-x-4">
            {user?.linkedInURL && <a href={user.linkedInURL} target="_blank" rel="noopener noreferrer"><Linkedin className="w-6 h-6" /></a>}
            {user?.githubURL && <a href={user.githubURL} target="_blank" rel="noopener noreferrer"><Github className="w-6 h-6" /></a>}
            {user?.twitterURL && <a href={user.twitterURL} target="_blank" rel="noopener noreferrer"><X className="w-6 h-6" /></a>}
          </div>
          <button
  onClick={() => navigate("/privacy-policy")}
  className="text-sm text-gray-500 hover:underline"
>
  📄 Privacy Policy
</button>

        </div>

        {/* Middle Section - Contact Info */}
        <div className="flex flex-col items-center md:items-start space-y-4 mt-3">
          <h3 className="text-lg font-semibold">🚀 Connect With Me</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-2"><Mail size={18} /><a href={`mailto:${user.email}`}>{user.email}</a></div>
            <div className="flex items-center gap-2"><Phone size={18} /><a href={`tel:${user.phone}`}>+{user.phone}</a></div>
            <div className="flex items-center gap-2"><MapPin size={18} /><span>Addis Ababa, Ethiopia</span></div>
          </div>
        </div>

        {/* Right Section - Subscribe to Newsletter */}
        <div className="flex flex-col items-center md:items-start mt-3">
          <h3 className="text-lg font-semibold mb-2">📩 Subscribe to Newsletter</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Get the latest updates and news</p>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded-md w-60 dark:bg-gray-800 dark:text-white"
          />
          <button
            onClick={handleSubscribe}
            className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Scroll Arrows */}
      <div className="fixed right-6 bottom-6 space-y-4">
        {showArrows.up && <button onClick={scrollToTop} className="p-3 bg-white dark:bg-gray-700 rounded-full shadow-lg"><ArrowUp className="w-6 h-6 text-green-600" /></button>}
        {showArrows.down && <button onClick={scrollToBottom} className="p-3 bg-white dark:bg-gray-700 rounded-full shadow-lg"><ArrowDown className="w-6 h-6 text-green-600" /></button>}
      </div>

      {/* Copyright */}
      <div className="text-center pt-8 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400">© {new Date().getFullYear()} ezu. All rights reserved!</p>
      </div>

      {/* Toast Container */}
      <ToastContainer position="bottom-right" autoClose={4000} hideProgressBar={false} newestOnTop closeOnClick />
    </footer>
  );
};

export default Footer;
