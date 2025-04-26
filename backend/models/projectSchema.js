


import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // Optional: Make it required if necessary
    },
    description: {
        type: String,
        required: true, // Optional: Make it required if necessary
    },
    gitRepoLink: {
        type: String,
        required: true, // Optional: Make it required if necessary
    },
    projectLink: {
        type: String,
        required: true, // Optional: Make it required if necessary
    },
    technologies: {
        type: [String], // Use an array if it holds multiple technologies
        required: true, // Optional: Make it required if necessary
    },
    stack: {
        type: [String], // Use an array if it holds multiple stack items
        required: true, // Optional: Make it required if necessary
    },
    deployed: {
        type: String,
        required: true, // Optional: Make it required if necessary
    },
    projectBanner: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
});

// Corrected the model name from 'Ppoject' to 'Project'
export const Project = mongoose.model("Project", projectSchema);
