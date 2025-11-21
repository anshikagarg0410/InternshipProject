// khushisgh01/internshipproject/InternshipProject-8a5f69cd629fc2efec8342b72121374131129261/backend/controllers/journalController.js

import JournalEntry from '../models/JournalEntry.js'; // 💡 NEW IMPORT - Model

const getJournalEntries = async (req, res) => {
    try {
        // 💡 UPDATED: Filter by the authenticated user's ID
        const entries = await JournalEntry.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(entries);
    } catch (error) {
        console.error("Error fetching journal entries:", error);
        res.status(500).json({ message: "Failed to fetch journal entries" });
    }
};

const createJournalEntry = async (req, res) => {
    // 💡 UPDATED: Add user ID to the entry data
    const newEntryData = {
        ...req.body,
        user: req.user._id // Get user ID from middleware
    };
    
    try {
        const newEntry = await JournalEntry.create(newEntryData);
        res.status(201).json(newEntry);
    } catch (error) {
        console.error("Error creating journal entry:", error);
        res.status(500).json({ message: "Failed to create journal entry" });
    }
};

// 💡 NEW: Update Journal Entry
const updateJournalEntry = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        // 💡 UPDATED: Ensure the entry belongs to the authenticated user before updating
        const updatedEntry = await JournalEntry.findOneAndUpdate(
            { _id: id, user: req.user._id },
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedEntry) {
            return res.status(404).json({ message: "Journal entry not found or user not authorized" });
        }

        res.json(updatedEntry);
    } catch (error) {
        console.error("Error updating journal entry:", error);
        res.status(500).json({ message: "Failed to update journal entry" });
    }
};

// 💡 NEW: Delete Journal Entry
const deleteJournalEntry = async (req, res) => {
    const { id } = req.params;

    try {
        // 💡 UPDATED: Ensure the entry belongs to the authenticated user before deleting
        const deletedEntry = await JournalEntry.findOneAndDelete({ _id: id, user: req.user._id });

        if (!deletedEntry) {
            return res.status(404).json({ message: "Journal entry not found or user not authorized" });
        }

        res.status(204).send();
    } catch (error) {
        console.error("Error deleting journal entry:", error);
        res.status(500).json({ message: "Failed to delete journal entry" });
    }
};

export default {
    getJournalEntries,
    createJournalEntry,
    updateJournalEntry,
    deleteJournalEntry,
};