// khushisgh01/internshipproject/InternshipProject-8a5f69cd629fc2efec8342b72121374131129261/src/components/ui/timeLinePage.jsx

import React from 'react'
import { useOutletContext } from 'react-router-dom'; // 💡 NEW: Import hook to get context
import JournalEntry from './journelEntry' // Make sure path is correct

const TimelinePage = () => {
  // 💡 NEW: Use the context passed from the parent (Journel.jsx)
  const { entries, loading, error } = useOutletContext();
  
  return (
    <>
      <div className='mt-6 bg-white p-6 rounded-2xl shadow-md'>
          <h2 className='font-normal mb-4'>Recent Entries</h2>
          <div className='space-y-4'>
              
              {loading && (
                  <p className='text-center text-violet-600'>Loading entries...</p>
              )}

              {error && (
                   <p className='text-center text-red-600'>Error: {error}</p>
              )}

              {!loading && entries.length === 0 && (
                  <p className='text-center text-gray-500'>No entries yet. Start a new entry!</p>
              )}

              {/* 💡 Map over the fetched entries */}
              {!loading && entries.map(entry => (
                <JournalEntry 
                  key={entry._id} // Use MongoDB's unique ID
                  emoji={entry.emoji}
                  mood={entry.mood}
                  // Use the date from the entry, format it if needed, or use createdAt
                  date={new Date(entry.createdAt).toLocaleDateString()} 
                  text={entry.text}
                  tags={entry.tags}
                />
              ))}
          </div>
      </div>
    </>
  )
}

export default TimelinePage