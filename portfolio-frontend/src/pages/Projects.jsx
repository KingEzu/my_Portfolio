import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Github } from "lucide-react";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 15; // 5 rows * 3 columns

    useEffect(() => {
        const getMyProjects = async () => {
            try {
                const { data } = await axios.get("https://mern-stack-portfolio-backend-code-7m37.onrender.com/api/v1/project/getall", { withCredentials: true });
                setProjects(Array.isArray(data.projects) ? data.projects : []);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };
        getMyProjects();
    }, []);

    const totalPages = Math.ceil(projects.length / projectsPerPage);
    const startIndex = (currentPage - 1) * projectsPerPage;
    const currentProjects = projects.slice(startIndex, startIndex + projectsPerPage);

    return (
        <div className="px-4 py-8">
            {/* Title Section */}
            <div className="relative mb-8">
            <h1
    className="flex gap-4 items-center text-[2rem] sm:text-[2.75rem] 
    md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] 
    tracking-[15px] mx-auto w-fit font-extrabold about-h1"
    style={{ background: "hsl(222.2 84% 4.9%)" }}
>
    <span className="text-tubeLight-effect font-extrabold">Projects</span>
</h1>

                <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {currentProjects.map((element) => (
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

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-6">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                    ←
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-4 py-2 border rounded ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                    →
                </button>
            </div>
        </div>
    );
};

export default Projects;
