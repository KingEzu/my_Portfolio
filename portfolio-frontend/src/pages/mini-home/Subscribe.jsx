import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTheme } from '../../components/themeProvider';

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { theme } = useTheme();

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
    <div
      className={`subscribe-container ${
        theme === 'dark' ? 'bg-gradient-to-r from-gray-700 to-gray-900' : 'bg-gradient-to-r from-blue-500 to-indigo-600'
      } p-12 rounded-lg shadow-xl text-center`}
    >
      <h2
        className={`text-${theme === 'dark' ? 'white' : 'gray-900'} text-3xl sm:text-4xl font-bold mb-4`}
      >
        Stay Updated
      </h2>
      <p
        className={`text-${theme === 'dark' ? 'gray-300' : 'gray-200'} text-lg sm:text-xl mb-6`}
      >
        Subscribe to our newsletter for the latest updates, news, and more. Be the first to know!
      </p>

      <div className="flex justify-center items-center gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={`p-3 w-64 sm:w-80 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out ${
            theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
          }`}
        />
        <button
          onClick={handleSubscribe}
          className={`${
            theme === 'dark' ? 'bg-yellow-500 text-gray-900' : 'bg-yellow-500 text-white'
          } px-6 py-3 rounded-full text-lg font-semibold hover:bg-yellow-400 transition duration-300 ease-in-out transform hover:scale-105`}
        >
          Subscribe
        </button>
      </div>

      {isSubmitted && (
        <p
          className={`${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          } mt-4 text-lg font-semibold`}
        >
          Thank you for subscribing! Check your inbox for updates.
        </p>
      )}
    </div>
  );
};

export default Subscribe;
