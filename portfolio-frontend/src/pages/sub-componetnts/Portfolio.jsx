import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Github } from "lucide-react";

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3); // Number of visible cards
  const navigate = useNavigate(); // Hook to handle navigation

  useEffect(() => {
    const getMyProjects = async () => {
      try {
        const { data } = await axios.get(
          "https://mern-stack-portfolio-backend-code-7m37.onrender.com/api/v1/project/getall",
          { withCredentials: true }
        );
        setProjects(data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    getMyProjects();
  }, []);

  const handleShowMore = () => {
    // Navigate to a new page showing all projects
    navigate("/Projects");
  };

  return (
    <div>
      <div className="relative mb-12">
        <h1
          className="hidden sm:flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
          lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] 
          mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          <span className="text-tubeLight-effect font-extrabold">PROJECT</span>
        </h1>
        <h1
          className="flex sm:hidden gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] 
          tracking-[15px] mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          MY <span className="text-tubeLight-effect font-extrabold">WORK</span>
        </h1>
        <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {projects.slice(0, visibleCount).map((element) => (
          <div key={element._id} className="rounded-lg border border-gray-300 shadow-lg">
            <Link to={`/project/${element._id}`}>
              <img
                className="w-full h-[300px] sm:h-[400px] object-contain"
                src={element.projectBanner?.url || "/placeholder.png"}
                alt={element.title}
              />
            </Link>
            <div className="p-4 flex justify-between items-center">
              <h2 className="text-lg font-bold">{element.title}</h2>
              {element.gitRepoLink && (
                <a
                  href={element.gitRepoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 flex items-center gap-2"
                >
                  <Github size={24} />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full flex justify-end my-9">
        {projects.length > visibleCount && (
          <button
            className="text-blue-500 underline hover:text-blue-700"
            onClick={handleShowMore}
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
};

export default Portfolio;