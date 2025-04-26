import React from 'react';
import { useTheme } from "../../components/themeProvider";
import FrontEndIcon from '../../assets/icons/front-end.svg';
import BackEndIcon from '../../assets/icons/back-end-red.svg';
import IntegrationIcon from '../../assets/icons/integration_2.svg';
import TestingIcon from '../../assets/icons/testing-type.svg';
import SupportIcon from '../../assets/icons/support.svg';
import EvolutionIcon from '../../assets/icons/help-desk_1.svg';

const Service = () => {
  const { theme } = useTheme();

  return (
    <div className={`service-container }`}>
      <h1 className="text-tubeLight-effect text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
        lg:text-[3.8rem] tracking-[15px] dancing_text mx-auto flex justify-center items-center w-fit">
        Services
      </h1>

      <div className="p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Full Stack Development */}
          <div className={`bg-${theme === 'dark' ? 'gray-800' : 'white'} p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105`}>
            <img src={FrontEndIcon} alt="Full Stack Icon" className="w-10 h-10 sm:w-12 sm:h-12 mb-4 mx-auto" />
            <h2 className={`text-xl font-semibold mb-4 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              Full Stack Development
            </h2>
            <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              From crafting engaging user interfaces to building powerful backend systems, I develop complete web applications using modern technologies like React, Node.js, Express, and MongoDB.
            </p>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              End-to-end solutions tailored for performance, scalability, and maintainability.
            </p>
          </div>

          {/* Integration */}
          <div className={`bg-${theme === 'dark' ? 'gray-800' : 'white'} p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105`}>
            <img src={IntegrationIcon} alt="Integration Icon" className="w-10 h-10 sm:w-12 sm:h-12 mb-4 mx-auto" />
            <h2 className={`text-xl font-semibold mb-4 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              Integration
            </h2>
            <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              I integrate third-party APIs, payment gateways, databases, and other services to ensure your application functions as a cohesive system.
            </p>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Smooth connectivity between components, services, and external platforms.
            </p>
          </div>

          {/* Help Desk */}
          <div className={`bg-${theme === 'dark' ? 'gray-800' : 'white'} p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105`}>
            <img src={EvolutionIcon} alt="Help Desk Icon" className="w-10 h-10 sm:w-12 sm:h-12 mb-4 mx-auto" />
            <h2 className={`text-xl font-semibold mb-4 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              Help Desk
            </h2>
            <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Dedicated assistance for any technical issues or questions. I provide responsive, friendly support to help you resolve problems quickly.
            </p>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              You're never left alone — I’m here when you need help the most.
            </p>
          </div>

          {/* Continuous Support and Evolution */}
          <div className={`bg-${theme === 'dark' ? 'gray-800' : 'white'} p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105`}>
            <img src={SupportIcon} alt="Support Icon" className="w-10 h-10 sm:w-12 sm:h-12 mb-4 mx-auto" />
            <h2 className={`text-xl font-semibold mb-4 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              Continuous Support and Evolution
            </h2>
            <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              I offer long-term support for updates, optimizations, and feature expansion to keep your product aligned with your goals and users’ needs.
            </p>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Your success doesn’t stop at launch — I evolve with you.
            </p>
          </div>
        </div>
      </div>

      {/* Light/Dark Theme Styling */}
      <style>
        {`
          .service-container.light {
            background-color: #f4f4f4;
          }
          .service-container.dark {
            background-color: #121212;
            color: white;
          }
        `}
      </style>
    </div>
  );
};

export default Service;
