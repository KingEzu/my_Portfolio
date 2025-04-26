import React, { useEffect, useState } from "react";
import axios from "axios";

const About = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getMyProfile = async () => {
      try {
        const { data } = await axios.get(
          "https://mern-stack-portfolio-backend-code-7m37.onrender.com/api/v1/user/me",
          { withCredentials: true }
        );
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    getMyProfile();
  }, []);

  return (
    <div className="w-full flex flex-col overflow-x-hidden">
      {/* Title Section */}
      <div className="relative">
        <h1
          className="flex gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] 
          lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold about-h1"
          style={{ background: "hsl(222.2 84% 4.9%)" }}
        >
          <span className="text-tubeLight-effect font-extrabold">ABOUT ME</span>
        </h1>
        <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
      </div>

      {/* Subtitle */}
      <div className="text-center">
        <p className="uppercase text-xl text-slate-400">
          Allow me to introduce myself.
        </p>
      </div>

      {/* Content Section */}
      <div className="grid md:grid-cols-2 my-8 sm:my-20 gap-14">
        {/* Profile Image */}
        <div className="flex justify-center items-center">
          <img
            src={user?.avatar?.url || "/placeholder.png"} // Fallback if no image
            alt="avatar"
            className="bg-transparent p-2 sm:p-4 rotate-[370deg] h-[290px] sm:h-[340px] md:h-[350px] lg:h-[450px]"
          />
        </div>

        {/* Text Content */}
        <div className="flex justify-center flex-col tracking-[1px] text-xl gap-5">
          <p>
            My name is <b>Ezana</b>, and I am an experienced application developer and full-stack
            developer based in Addis Ababa, Ethiopia. I specialize in designing and delivering innovative,
            efficient solutions tailored to meet the unique needs of businesses and individuals.
          </p>
          <p>
            With a strong academic foundation, I earned a diploma in Information Technology in 2021
            and graduated with a bachelor’s degree in Computer Science in 2024. My combination of technical
            expertise and a passion for problem-solving allows me to deliver high-quality, impactful results on every project.
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default About;
