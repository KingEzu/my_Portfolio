import React, { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";
import { clearAllProjectErrors, getMyProjects, resetProjectSlice, updateProject } from "@/store/slices/projectSlice";
import { Button } from "@/components/ui/button";

const UpdateProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [projectBannerPreview, setProjectBannerPreview] = useState("");

  const { error, message, loading } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigateTo = useNavigate();

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axios.get(`https://mern-stack-portfolio-backend-code-7m37.onrender.com/api/v1/project/get/${id}`, { withCredentials: true });
        setTitle(res.data.project.title);
        setDescription(res.data.project.description);
        setStack(res.data.project.stack);
        setDeployed(res.data.project.deployed);
        setTechnologies(res.data.project.technologies);
        setGitRepoLink(res.data.project.gitRepoLink);
        setProjectLink(res.data.project.projectLink);
        setProjectBanner(res.data.project.projectBanner?.url || "");
        setProjectBannerPreview(res.data.project.projectBanner?.url || "");
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching project");
      }
    };

    getProject();

    if (error) {
      toast.error(error);
      dispatch(clearAllProjectErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getMyProjects());
    }
  }, [id, message, error, dispatch]);

  const handleProjectBanner = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProjectBannerPreview(reader.result);
      setProjectBanner(file);
    };
  };

  const handleUpdateProject = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("deployed", deployed);
    formData.append("stack", stack);
    formData.append("technologies", technologies);
    formData.append("gitRepoLink", gitRepoLink);
    formData.append("projectLink", projectLink);
    formData.append("projectBanner", projectBanner);
    dispatch(updateProject(id, formData));
  };

  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  return (
    <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 dark:bg-gray-900 bg-white">
      <form onSubmit={handleUpdateProject} className="w-[100%] px-5 md:w-[1000px] pb-5">
        <div className="space-y-12">
          <div className="border-b border-gray-300 dark:border-gray-700 pb-12">
            <div className="flex flex-col gap-2 items-start justify-between sm:items-center sm:flex-row">
              <h2 className="font-semibold leading-7 text-3xl dark:text-white text-black">UPDATE PROJECT</h2>
              <Button onClick={handleReturnToDashboard} className="dark:bg-gray-700 dark:text-white bg-gray-200 text-black">
                Return to Dashboard
              </Button>
            </div>
            <div className="mt-10 flex flex-col gap-5">
              {/* Project Banner */}
              <div className="w-full">
                <img
                  src={projectBannerPreview || "/avatarHolder.jpg"}
                  alt="projectBanner"
                  className="w-full h-auto rounded-lg"
                />
                <input
                  type="file"
                  onChange={handleProjectBanner}
                  className="mt-4 w-full dark:text-white text-black"
                />
              </div>

              {/* Input Fields */}
              {[
                { label: "Project Title", value: title, setter: setTitle, type: "text" },
                { label: "GitHub Repository Link", value: gitRepoLink, setter: setGitRepoLink, type: "text" },
                { label: "Project Link", value: projectLink, setter: setProjectLink, type: "text" }
              ].map((field, index) => (
                <div key={index} className="w-full">
                  <label className="block text-sm font-medium dark:text-white text-black">{field.label}</label>
                  <input
                    type={field.type}
                    className="border rounded-lg p-2 w-full dark:bg-gray-800 dark:text-white text-black"
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                  />
                </div>
              ))}

              {/* Textareas */}
              {[
                { label: "Description", value: description, setter: setDescription },
                { label: "Technologies", value: technologies, setter: setTechnologies }
              ].map((field, index) => (
                <div key={index} className="w-full">
                  <label className="block text-sm font-medium dark:text-white text-black">{field.label}</label>
                  <Textarea
                    className="border rounded-lg p-2 w-full dark:bg-gray-800 dark:text-white text-black"
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          {loading ? (
            <SpecialLoadingButton content={"Updating"} width={"w-52"} />
          ) : (
            <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 w-52">
              Update
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdateProject;
