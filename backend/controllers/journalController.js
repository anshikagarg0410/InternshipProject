// khushisgh01/internshipproject/InternshipProject-8a5f69cd629fc2efec8342b72121374131129261/backend/controllers/journalController.js

import JournalEntry from '../models/JournalEntry.js'; // 💡 NEW IMPORT - Model

const getJournalEntries = async (req, res) => {
    try {
        // Find all entries, sort by latest creation date, and send
        const entries = await JournalEntry.find().sort({ createdAt: -1 });
        res.json(entries);
    } catch (error) {
        console.error("Error fetching journal entries:", error);
        res.status(500).json({ message: "Failed to fetch journal entries" });
    }
};

const createJournalEntry = async (req, res) => {
    const newEntryData = req.body;
    
    try {
        // Create a new document in the MongoDB collection
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
        const updatedEntry = await JournalEntry.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true } // Return the updated document and run schema validation
        );

        if (!updatedEntry) {
            return res.status(404).json({ message: "Journal entry not found" });
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
        const deletedEntry = await JournalEntry.findByIdAndDelete(id);

        if (!deletedEntry) {
            return res.status(404).json({ message: "Journal entry not found" });
        }

        // Return a 204 No Content status for successful deletion
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting journal entry:", error);
        res.status(500).json({ message: "Failed to delete journal entry" });
    }
};


export default {
    getJournalEntries,
    createJournalEntry,
    // 💡 Export new functions
    updateJournalEntry,
    deleteJournalEntry,
};