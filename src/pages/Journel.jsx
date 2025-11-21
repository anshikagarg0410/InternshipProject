// khushisgh01/internshipproject/InternshipProject-8a5f69cd629fc2efec8342b72121374131129261/src/pages/Journel.jsx

import React, { useState, useEffect, useCallback } from 'react'
import Sidebar from '../components/ui/Sidebar'
import BottomNavBar from '../components/ui/bottomNavbar'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext' // 💡 NEW IMPORT

const API_URL = '/api/journal';

const Journel = () => {
  const { getAuthHeader } = useAuth(); // 💡 GET AUTH HEADER FUNCTION
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch data from the backend
  const fetchEntries = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
        const response = await fetch(API_URL, {
            headers: getAuthHeader() // 💡 PASS AUTH HEADER
        }); 
        if (!response.ok) {
            // Handle 401/403 specifically here if needed, but the protect middleware handles it on the server side
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEntries(data);
    } catch (e) {
        console.error("Error fetching journal entries:", e);
        setError("Failed to load journal entries.");
    } finally {
        setLoading(false);
    }
  }, [getAuthHeader]); // Dependency on getAuthHeader

  // Fetch data on component mount
  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  // We pass fetchEntries as a dependency into the Outlet to trigger refetching after a save.
  return (
    <div className='flex min-h-screen'>
        <Sidebar/>
        <div className='flex-1 p-8 '>
            <h1 className="text-3xl font-bold text-gray-800">Mood Journal</h1>
            <p className='text-gray-500'>Track your emotional journey and discover patterns</p>
            <BottomNavBar/>
            {/* Pass the entries and the refetch function to the Outlet context */}
            <Outlet context={{ entries, loading, error, refetchEntries: fetchEntries }} />
        </div>
    </div>
  )
}

export default Journel