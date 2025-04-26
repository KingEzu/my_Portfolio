import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Phone, Linkedin, Send, Mail } from 'lucide-react';
import ContactImage from '../../assets/contact.jpg';
import { useTheme } from '../../components/themeProvider';

const ContactMe = () => {
  const [user, setUser] = useState({});
  const { theme } = useTheme();

  useEffect(() => {
    const getMyProfile = async () => {
      try {
        const { data } = await axios.get("https://mern-stack-portfolio-backend-code-7m37.onrender.com/api/v1/user/me", {
          withCredentials: true,
        });
        setUser(data.user);
      } catch (error) {
        console.error("Failed to fetch user data:", error.message);
      }
    };
    getMyProfile();
  }, []);

  // Open selected link
  const handleRedirect = (platform) => {
    if (platform === "linkedin" && user?.linkedInURL) {
      window.open(user.linkedInURL.startsWith("http") ? user.linkedInURL : `https://${user.linkedInURL}`, "_blank");
    } else if (platform === "telegram") {
      window.open("https://t.me/ezuEt", "_blank");
    } else if (platform === "email" && user?.email) {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${user.email}`, "_blank");}
  };

  return (
    <div className={`p-10 rounded-lg shadow-lg mx-0 mb-20 ${theme.mode === 'dark' ? 'bg-gray-500' : 'bg-gray-300'}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Text Section */}
        <div className="text-center lg:text-left">
          <h2 className={`text-2xl font-bold mb-4 ${theme.mode === 'dark' ? 'text-gray-800' : 'text-gray-700'}`}>
            Contact Me
          </h2>
          <p className={`mb-8 ${theme.mode === 'dark' ? 'text-gray-600' : 'text-gray-500'}`}>
            Feel free to reach out through any of the available contact methods below.
          </p>
        </div>

        {/* Image Section */}
        <div className="relative mx-auto">
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <img src={ContactImage} alt="Contact" className="w-full h-auto object-cover" />
          </div>
        </div>
      </div>

      {/* Contact Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        {/* Call Us */}
        <div className="text-center p-4 rounded-lg shadow-sm hover:shadow-md transition bg-gray-200">
          <Phone className="w-6 h-6 mx-auto mb-2 text-gray-700" />
          <p className="text-sm font-medium text-gray-700">Call us directly</p>
          <p className="text-sm font-semibold text-blue-600 mt-1">
            <strong>{user.phone}</strong>
          </p>
          <p className="text-gray-800 font-medium text-sm">
            I’ll respond during your work hours from <span className="text-blue-600 font-bold">8:00 AM to 6:00 PM</span>.
          </p>
        </div>

        {/* Contact via Social Media */}
        <div className="text-center p-4 rounded-lg shadow-sm hover:shadow-md transition bg-gray-200">
          <p className="text-sm font-medium text-gray-700 mb-4">Choose a contact method:</p>
          <div className="flex justify-center space-x-4">
            {user?.linkedInURL && (
              <button
                className="p-3 rounded-full bg-blue-500 hover:bg-blue-700 transition"
                onClick={() => handleRedirect("linkedin")}
              >
                <Linkedin className="w-6 h-6 text-white" />
              </button>
            )}

            <button
              className="p-3 rounded-full bg-blue-500 hover:bg-blue-700 transition"
              onClick={() => handleRedirect("telegram")}
            >
              <Send className="w-6 h-6 text-white" />
            </button>

            {user?.email && (
              <button
                className="p-3 rounded-full bg-blue-500 hover:bg-blue-700 transition"
                onClick={() => handleRedirect("email")}
              >
                <Mail className="w-6 h-6 text-white" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMe;
