import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ManageTimeline from "./pages/ManageTimeline";
import ResetPassword from "./pages/ResetPassword";
import ManageSkills from "./pages/ManageSkills";
import ManageProjects from "./pages/ManageProjects";
import ViewProjects from "./pages/ViewProjects";
import UpdateProject from "./pages/UpdateProject";
import AddTimeline from "./pages/sub-components/AddTimeline";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Login";
import { useDispatch } from "react-redux";
import ForgetPassword from "./pages/ForgetPassword";
import { getUser } from "./store/slices/userSlice";  
import { getAllMessages } from "./store/slices/messagesSlice";
import { getAllSkills } from "./store/slices/skillSlice";
import { getAllSoftwareApplications } from "./store/slices/softwareApplication.Slice";
import { getMyProjects } from "./store/slices/projectSlice";
import ManageSubscribersPage from "./pages/ManageSubscribersPage"; // Fixed import
import SendNewsletterPage from "./pages/sub-components/SendNewsletterPage"; // Fixed import
import ManageNewsletter from "./pages/ManageNewsletter";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
        dispatch(getAllMessages());
        dispatch(getAllSkills());
        dispatch(getAllSoftwareApplications());
        dispatch(getMyProjects());
    }, [dispatch]);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/password/forget" element={<ForgetPassword />} />
                <Route path="/password/reset/:token" element={<ResetPassword />} />
                <Route path="/manage/skills" element={<ManageSkills />} />
                <Route path="/manage/timeline" element={<ManageTimeline />} />
                <Route path="/manage/projects" element={<ManageProjects />} />
                <Route path="/view/project/:id" element={<ViewProjects />} />
                <Route path="/update/project/:id" element={<UpdateProject />} />
                <Route path="/addtimeline" element={<AddTimeline />} />
                <Route path="/manage/subscribers" element={<ManageSubscribersPage />} /> 
                <Route path="/send-newsletter" element={<SendNewsletterPage />} />
                <Route path="/manage/newsletter" element={<ManageNewsletter />} />
            </Routes>
            <ToastContainer position="bottom-right" theme="dark" />
        </Router>
    );
}

export default App;
