import React, { useState, useEffect } from 'react';
import { useTheme } from "../../components/themeProvider";
const FHome = () => {
    const { theme } = useTheme();
    return (
      <div className={`fhome-container ${theme}`}>
            {/* Full-screen container for the rain effect */}
            <div className="rain-container">
                {/* Stream with falling letters */}
                <div className="stream">
                    <span>ደ</span><span>ሸ</span><span>ገ</span><span>ጀ</span><span>ወ</span><span>ቀ</span>
                </div>
                <div className="stream">
                    <span>፩</span><span>፪</span><span>፫</span><span>፬</span><span>፭</span><span>፮</span>
                </div>
                <div className="stream">
                    <span>መ</span><span>ነ</span><span>ኘ</span><span>ተ</span><span>ቀ</span><span>ቨ</span>
                </div>
                <div className="stream">
                    <span>ዘ</span><span>አ</span><span>ፐ</span><span>የ</span><span>ጀ</span><span>ከ</span>
                </div>
                <div className="stream">
                    <span>ለ</span><span>በ</span><span>ለ</span><span>የ</span><span>ጀ</span><span>ፐ</span>
                </div>
                <div className="stream">
                    <span>ቸ</span><span>ሰ</span><span>ሸ</span><span>ቨ</span><span>አ</span><span>ዘ</span>
                </div>
                <div className="stream">
                    <span>አ</span><span>ጰ</span><span>ኘ</span><span>ነ</span><span>ቀ</span><span>የ</span>
                </div>
               
                <div className="stream">
                    <span>፲</span><span>፫</span><span>፬</span><span>፮</span><span>፹</span><span>፼</span>
                </div>
                <div className="stream">
                    <span>ከ</span><span>ለ</span><span>መ</span><span>ሰ</span><span>ኸ</span><span>ደ</span>
                </div>
                <div className="stream">
                    <span>፩</span><span>፪</span><span>፫</span><span>፬</span><span>፭</span><span>፮</span>
                </div>
                <div className="stream">
                    <span>መ</span><span>ነ</span><span>ኘ</span><span>ተ</span><span>ቀ</span><span>ቨ</span>
                </div>
                <div className="stream">
                    <span>፩</span><span>፪</span><span>፫</span><span>፬</span><span>፭</span><span>፮</span>
                </div>
               
               {/*} <div className="stream">
                    <span>፩</span><span>፪</span><span>፫</span><span>፬</span><span>፭</span><span>፮</span>
                </div>
               
                <div className="stream">
                    <span>፩</span><span>፪</span><span>፫</span><span>፬</span><span>፭</span><span>፮</span>
                </div>
                <div className="stream">
                    <span>1</span><span>0</span><span>1</span><span>0</span><span>0</span><span>1</span>
                </div>*/}
           
              
            
            </div>

            {/* Sidebar for description */}
            <div className="sidebar">
        <h2>Note</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam
          earum minima maiores non illo pariatur nihil quia nobis beatae vero
          recusandae autem magnam dolorem iure, ipsa ipsum cumque quasi debitis.
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti
          quisquam, soluta quis nisi itaque natus. Quibusdam autem, rem iste
          distinctio provident, inventore doloremque, sunt placeat blanditiis
          corporis atque facere corrupti.
        </p>
        <p>Enjoy the effect!</p>
      </div>

      {/* Scroll Button */}
  

            <style>
                {`

                
                body {
                    margin: 0;
                    padding: 0;
                    font-family: 'Courier New', monospace;
                    background: ${theme === "dark" ? "#000" : "#fff"};
                    color: ${theme === "dark" ? "white" : "black"};
           
                }
            



                /* Full screen container for rainfall */
                .rain-container {
                    position: absolute;
                    top: 100px; /* Adjust based on your navigation bar height */
                    width: 90%;
                    height: calc(100vh - 50px);
                    pointer-events: none; /* Makes sure the animation doesn't interfere with other elements */
                    overflow: hidden; 
                }

                /* Stream of letters falling */
                .stream {
                    position: absolute;
                    top: 0;
                    left: 0;
                    color: ${theme === "dark" ? "lime" : "green"};
                    font-size: 1.2rem; /* Adjust the font size */
                    font-weight: bold;
                    text-shadow: 
                        0px 0px 10px rgba(0, 255, 0, 0.8),
                        0px 0px 20px rgba(0, 255, 0, 0.6);
                    animation: fall linear infinite;
                    transform-style: preserve-3d;
                }
  .stream:nth-child(1) {
            left: 5%;
            animation-duration: 3.5s;
            animation-delay: 0s;
          }

          .stream:nth-child(2) {
            left: 10%;
            animation-duration: 4s;
            animation-delay: 0.3s;
          }

                .stream span {
                    display: block;
                    color: rgba(0, 255, 0, 0.7);
                    transform: translateZ(-0px);
                    animation: fade 1s linear infinite;
                    white-space: nowrap; /* Prevents letters from wrapping */
                }

                /* Falling animation */
                @keyframes fall {
                    0% {
                        transform: translateY(-1%);
                    }
                    100% {
                        transform: translateY(60vh); /* Fills the screen vertically */
                    }
                }

                /* Fade animation to give a "disappearing" effect */
                @keyframes fade {
                    0% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.5;
                    }
                    100% {
                        opacity: 0;
                    }
                }

                /* Randomly position the streams across the screen */
                .stream:nth-child(1) { left: 5%; animation-duration: 3.5s; animation-delay: 0s; }
                .stream:nth-child(2) { left: 10%; animation-duration: 4s; animation-delay: 0.3s; }
                .stream:nth-child(3) { left: 15%; animation-duration: 4.2s; animation-delay: 0.1s; }
                .stream:nth-child(4) { left: 20%; animation-duration: 4.5s; animation-delay: 0.5s; }
                .stream:nth-child(5) { left: 25%; animation-duration: 3s; animation-delay: 0.2s; }
                .stream:nth-child(6) { left: 30%; animation-duration: 4.3s; animation-delay: 1s; }
                .stream:nth-child(7) { left: 35%; animation-duration: 3.8s; animation-delay: 0.7s; }
                .stream:nth-child(8) { left: 40%; animation-duration: 4.1s; animation-delay: 0.8s; }
                .stream:nth-child(9) { left: 45%; animation-duration: 3.7s; animation-delay: 1.1s; }
                .stream:nth-child(10) { left: 50%; animation-duration: 4.0s; animation-delay: 0.9s; }
                .stream:nth-child(11) { left: 55%; animation-duration: 4.4s; animation-delay: 0.4s; }
                .stream:nth-child(12) { left: 60%; animation-duration: 3.6s; animation-delay: 1.2s; }
                .stream:nth-child(13) { left: 65%; animation-duration: 4.2s; animation-delay: 1.3s; }
                .stream:nth-child(14) { left: 70%; animation-duration: 3.9s; animation-delay: 1.5s; }
                .stream:nth-child(15) { left: 75%; animation-duration: 4.3s; animation-delay: 1.7s; }
                .stream:nth-child(16) { left: 80%; animation-duration: 3.8s; animation-delay: 1.9s; }
                .stream:nth-child(17) { left: 85%; animation-duration: 4.5s; animation-delay: 2.1s; }

                /* Sidebar styles */
               .sidebar {
    position: absolute; /* Change to absolute */
    top: 25%; /* Slightly away from the top */
    right: 100px; /* Add margin from the right */
    width: 900px; /* Slightly wider for better readability */
    height: auto; /* Adjust height to fit content */
   // background: rgba(0, 0, 0, 0.8);
    color: ${theme === "dark" ? "white" : "black"};
    padding: 100px; /* Padding inside the note for better spacing */
    font-size: 1rem;
    font-family: 'Arial', sans-serif;
    overflow-y: auto;
    border-radius: 10px; /* Rounded corners */
     box-shadow: 0 0 15px ${theme === "dark" ? "rgba(0, 255, 0, 0.5)" : "rgba(0, 0, 0, 0.2)"};
}
    .sidebar h2 {
        text-align: center;
        margin-bottom: 20px;
        font-size: 1.5rem; /* Slightly larger heading */
    }

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateX(-50%) translateY(0);
    }
    40% {
        transform: translateX(-50%) translateY(-20px); /* Bounce up */
    }
    60% {
        transform: translateX(-50%) translateY(-10px); /* Slight bounce */
    }
}
     

.light-p{
color: #000;
}
                
                .sidebar p {
        line-height: 1.8; /* Better line spacing for readability */
        font-size: 1.1rem;
        margin-bottom: 15px; /* Spacing between paragraphs */
    }
         @media (max-width: 768px) {
                    .sidebar {
                        width: 80%;
                        right:10%;
                        top: 25%;
                        padding: 10px;
                        font-size: 0.9rem;
                    }

                    .sidebar h2 {
                        font-size: 1.3rem;
                    }

                    .rain-container .stream {
                        font-size: 0.99rem;
                    }
                   /* .scroll-button{
                        display: none;
                    }*/

                }

                @media (max-width: 480px) {
                    .sidebar {
                        width: 80%;
                        padding: 5px;
                        left: 50px;
                    }

                    .rain-container .stream {
                        font-size: 0.8rem;
                    }
                }
                `}
            </style>
        </div>
    );
};

export default FHome;



