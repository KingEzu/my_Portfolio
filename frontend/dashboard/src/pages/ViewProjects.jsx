import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Copy, Loader2 } from "lucide-react";

const ViewProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState([]);
  const [stack, setStack] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!id) return;

    const getProject = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://mern-stack-portfolio-backend-code-7m37.onrender.com/api/v1/project/get/${id}`, {
          withCredentials: true,
        });

        const project = res.data.project;
        console.log("Project Data:", project); // Debugging
        console.log("Technologies Raw:", project.technologies); // Debugging

        if (project) {
          setTitle(project.title || "");
          setDescription(project.description || "");
          setStack(project.stack || "");
          setDeployed(project.deployed || "");
          setGitRepoLink(project.gitRepoLink || "");
          setProjectLink(project.projectLink || "");
          setProjectBanner(project.projectBanner?.url || "");

          // Ensure `technologies` is processed correctly
          if (Array.isArray(project.technologies)) {
            setTechnologies(project.technologies);
          } else if (typeof project.technologies === "string") {
            setTechnologies(project.technologies.split(/\s*,\s*/));
          } else {
            setTechnologies([]);
          }
        } else {
          toast.error("Project not found!");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching project");
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    getProject();
  }, [id]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin h-12 w-12 text-gray-500" />
      </div>
    );
  }

  const descriptionList = typeof description === "string" ? description.trim().split(/\.\s+/) : [];

  console.log("Processed Technologies List:", technologies); // Debugging

  return (
    <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4">
      <div className="w-[100%] px-5 md:w-[1000px] pb-5">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex justify-end">
              <Button onClick={() => navigateTo("/")}>Return to Dashboard</Button>
            </div>
            <div className="mt-10 flex flex-col gap-5">
              <div className="w-full sm:col-span-4">
                <h1 className="text-2xl font-bold mb-9 underline">{title}</h1>
                <img src={projectBanner || "/avatarHolder.jpg"} alt="projectBanner" className="w-full h-auto" />
              </div>

              {/* Reusable Field Component */}
              {[
                { label: "Description", value: descriptionList, isList: true },
                { label: "Technologies", value: technologies, isList: true },
                { label: "Stack", value: stack },
                { label: "Deployed", value: deployed },
                { label: "Github Repository Link", value: gitRepoLink, isLink: true },
                { label: "Project Link", value: projectLink, isLink: true }
              ].map((item, index) => (
                <div key={index} className="w-full sm:col-span-4 border p-3 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="text-xl font-semibold mb-2">{item.label}:</p>
                    {item.isList ? (
                      item.value && item.value.length > 0 ? (
                        <ul className="list-disc ml-5">
                          {item.value.map((v, i) => (
                            <li key={i}>{v}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500">No {item.label.toLowerCase()} listed</p>
                      )
                    ) : item.isLink ? (
                      <Link className="text-sky-700 break-all" target="_blank" to={item.value}>
                        {item.value}
                      </Link>
                    ) : (
                      <p>{item.value}</p>
                    )}
                  </div>
                  <Button variant="outline" size="icon" onClick={() => handleCopy(item.value)}>
                    <Copy className="h-5 w-5" />
                  </Button>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProject;
