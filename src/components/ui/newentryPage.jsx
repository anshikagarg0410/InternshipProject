// khushisgh01/internshipproject/InternshipProject-8a5f69cd629fc2efec8342b72121374131129261/src/components/ui/newentryPage.jsx

// khushisgh01/internshipproject/InternshipProject-8a5f69cd629fc2efec8342b72121374131129261/src/components/ui/newentryPage.jsx

import React from 'react';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import NewEntryForm from './entryForm'; 
import { useAuth } from '../../context/AuthContext'; // 💡 NEW IMPORT

const API_URL = '/api/journal';

const NewEntryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { refetchEntries } = useOutletContext(); 
  const { getAuthHeader } = useAuth(); // 💡 GET AUTH HEADER FUNCTION

  const passedMood = location.state?.selectedMood;
  const passedEmoji = location.state?.selectedEmoji;

  const handleSaveJournalEntry = async (newEntry) => {
    console.log("Attempting to save new entry:", newEntry);
    
    try {
        const entryToSend = {
            emoji: newEntry.emoji,
            mood: newEntry.mood,
            text: newEntry.text,
            tags: newEntry.tags,
            date: newEntry.date // Pass required date field
        };

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                ...getAuthHeader() // 💡 PASS AUTH HEADER
            },
            body: JSON.stringify(entryToSend),
        });

        if (!response.ok) {
            throw new Error(`Failed to save entry: ${response.status}`);
        }
        
        alert('Entry Saved Successfully!');
        
        if (refetchEntries) {
            await refetchEntries();
        }

        navigate('/journel'); 

    } catch (error) {
        console.error("Error saving entry:", error);
        alert(`Error saving entry: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Journal Entry</h1>
      
      <NewEntryForm 
        selectedMood={passedMood} 
        selectedEmoji={passedEmoji}
        onSaveEntry={handleSaveJournalEntry}
      />
    </div>
  );
};

export default NewEntryPage;