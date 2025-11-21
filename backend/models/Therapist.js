// New file: backend/models/Therapist.js
import mongoose from 'mongoose';

const TherapistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    location: { type: String, required: true },
    insurance: { type: [String] },
    rating: { type: Number },
    sessions: { type: [String] },
    bio: { type: String },
});

const Therapist = mongoose.model('Therapist', TherapistSchema);

export default Therapist;