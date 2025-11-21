import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from '../components/ui/Sidebar.jsx'; 
import ExerciseCard from '../components/ui/ExerciseCard.jsx'; 
import { useAuth } from '../context/AuthContext.jsx'; // 1. IMPORT useAuth
// We define the categories here, as they are part of the UI/filtering logic
const categories = ['All', 'Breathing', 'Mindfulness', 'Gratitude', 'CBT', 'Movement'];

const FilterButton = ({ category, selected, onClick }) => (
  <button
    onClick={() => onClick(category)}
    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 
      ${selected 
        ? 'bg-violet-500 text-white shadow-md' 
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
  >
    {category}
  </button>
);


const Exercises = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [exerciseData, setExerciseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getAuthHeader } = useAuth();

  // Function to fetch data from the backend API
  const fetchExercises = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
        const response = await fetch('/api/exercises', {
            headers: getAuthHeader() 
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setExerciseData(data);
    } catch (e) {
        console.error("Error fetching exercises:", e);
        setError("Failed to load exercises. Check if the backend is running.");
        setExerciseData([]);
    } finally {
        setLoading(false);
    }
  }, [getAuthHeader]);

  useEffect(() => {
    fetchExercises();
  }, [fetchExercises]);


  // Filtering logic moved here, applied to the fetched data
  const filteredExercises = exerciseData.filter(exercise => 
    selectedCategory === 'All' || exercise.category === selectedCategory
  );

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <Sidebar initialActiveItem="Exercises" /> 
      
      {/* Main Content Area */}
      <div className='flex-1 p-8 overflow-y-auto'> 
        
        {/* Header Section */}
        <div className='flex justify-between items-center mb-6'>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Wellness Exercises</h1>
            <p className='text-gray-500'>Evidence-based practices to support your mental wellbeing</p>
          </div>
          <button className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-800">
            <span className="mr-1">✨</span>
            Random Reset
          </button>
        </div>

        {/* Filter/Category Section */}
        <div className="flex space-x-3 mb-8 border-b pb-4 overflow-x-auto">
          {categories.map(cat => (
            <FilterButton 
              key={cat}
              category={cat}
              selected={selectedCategory === cat}
              onClick={setSelectedCategory}
            />
          ))}
        </div>

        {/* Loading/Error/Exercise Grid */}
        {loading ? (
            <div className='text-center p-8 bg-white rounded-xl shadow-md'>
                <p className='text-lg text-violet-600'>Loading exercises...</p>
            </div>
        ) : error ? (
             <div className='text-center p-8 bg-red-100 border border-red-400 text-red-700 rounded-xl shadow-md'>
                <p className='font-semibold'>Error loading data:</p>
                <p>{error}</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExercises.map((exercise) => (
                <ExerciseCard 
                  key={exercise._id}
                  imageSrc={exercise.imageSrc}
                  title={exercise.title}
                  duration={exercise.duration}
                  category={exercise.category}
                  difficulty={exercise.difficulty}
                  benefits={exercise.benefits}
                />
              ))}
            </div>
        )}

      </div>
    </div>
  );
};

export default Exercises;