// khushisgh01/internshipproject/InternshipProject-cbc12df567540c298725777ce3956a030bf171e4/backend/controllers/therapistController.js

import Therapist from '../models/Therapist.js'; // 💡 NEW IMPORT - Model

const getTherapistListings = async (req, res) => {
    const { specialty, location } = req.query;

    const filter = {}; // Build a filter object for Mongoose

    if (specialty && specialty !== 'All Specialties') {
        // Use a case-insensitive regex search for filtering
        filter.specialty = { $regex: specialty, $options: 'i' };
    }
    
    if (location && location !== 'All Locations') {
        filter.location = { $regex: location, $options: 'i' };
    }
    
    try {
        const therapists = await Therapist.find(filter); // 💡 Use Mongoose find(filter)
        res.json(therapists);
    } catch (error) {
        console.error("Error fetching therapist listings:", error);
        res.status(500).json({ message: "Failed to fetch therapist listings" });
    }
};

export default {
    getTherapistListings,
};