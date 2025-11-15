// khushisgh01/internshipproject/InternshipProject-8a5f69cd629fc2efec8342b72121374131129261/src/components/ui/newentryPage.jsx

import React from 'react';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import NewEntryForm from './entryForm'; // Adjust path

// New: API base URL for journal
const API_URL = '/api/journal';

const NewEntryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // 💡 NEW: Get the refetch function from the parent context
  const { refetchEntries } = useOutletContext(); 

  // 1. Read the (optional) mood passed from the Home page
  const passedMood = location.state?.selectedMood;
  const passedEmoji = location.state?.selectedEmoji;

  const handleSaveJournalEntry = async (newEntry) => {
    console.log("Attempting to save new entry:", newEntry);
    
    try {
        // Prepare data for the backend
        const entryToSend = {
            emoji: newEntry.emoji,
            mood: newEntry.mood,
            text: newEntry.text,
            tags: newEntry.tags,
            // 💡 FIX: The backend model requires the 'date' field. 
            // We ensure it is included using the date from the newEntry object.
            date: newEntry.date // Use the date generated in entryForm.jsx
        };

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(entryToSend),
        });

        if (!response.ok) {
            // Throw the exact message from the HTTP response
            throw new Error(`Failed to save entry: ${response.status}`);
        }
        
        // Success:
        alert('Entry Saved Successfully!');
        
        // 💡 NEW: Refetch data on the parent component (Journel.jsx)
        if (refetchEntries) {
            await refetchEntries();
        }

        // Navigate back to the timeline (index route of /journel)
        navigate('/journel'); 

    } catch (error) {
        console.error("Error saving entry:", error);
        alert(`Error saving entry: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Journal Entry</h1>
      
      {/* 2. Render the form, passing the mood props. */}
      <NewEntryForm 
        selectedMood={passedMood} 
        selectedEmoji={passedEmoji}
        onSaveEntry={handleSaveJournalEntry}
      />
    </div>
  );
};

export default NewEntryPage;