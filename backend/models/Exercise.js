// khushisgh01/internshipproject/InternshipProject-8a5f69cd629fc2efec8342b72121374131129261/backend/models/Exercise.js

import mongoose from 'mongoose';

const ExerciseSchema = new mongoose.Schema({
    // 💡 NEW: Link to the User model
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    imageSrc: { type: String },
    title: { type: String, required: true },
    duration: { type: Number },
    category: { type: String, required: true },
    difficulty: { type: String },
    benefits: { type: String },
});

const Exercise = mongoose.model('Exercise', ExerciseSchema);

export default Exercise;