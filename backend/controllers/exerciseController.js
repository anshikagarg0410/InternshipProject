// khushisgh01/internshipproject/InternshipProject-8a5f69cd629fc2efec8342b72121374131129261/backend/controllers/exerciseController.js

import Exercise from '../models/Exercise.js'; // 💡 NEW IMPORT - Model

const getExercises = async (req, res) => {
    try {
        // You would typically filter by a common field like category OR filter the user's progress.
        // For simplicity now, we just fetch all exercises (but restrict the route to logged-in users).
        const exercises = await Exercise.find(); 
        res.json(exercises);
    } catch (error) {
        console.error("Error fetching exercises:", error);
        res.status(500).json({ message: "Failed to fetch exercises" });
    }
};

export default {
    getExercises,
};