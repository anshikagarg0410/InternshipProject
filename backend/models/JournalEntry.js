// khushisgh01/internshipproject/InternshipProject-8a5f69cd629fc2efec8342b72121374131129261/backend/models/JournalEntry.js

import mongoose from 'mongoose';

const JournalEntrySchema = new mongoose.Schema({
    emoji: { type: String, required: true },
    mood: { type: String, required: true },
    date: { type: String, required: true }, // 💡 THIS FIELD IS REQUIRED
    text: { type: String, required: true },
    tags: { type: [String], default: [] },
}, { timestamps: true }); // Mongoose handles created/updated time

const JournalEntry = mongoose.model('JournalEntry', JournalEntrySchema);

export default JournalEntry;