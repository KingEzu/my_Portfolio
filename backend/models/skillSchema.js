import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    proficiency: {
        type: String,
        required: true,
    },
    svg: {
        public_id: String,
        url: String,
    },
});

export const Skill = mongoose.model('Skill', skillSchema);
