import React, { useState, useEffect, useCallback } from 'react';
import { MagnifyingGlassIcon, FunnelIcon, PhoneIcon, StarIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext'; // 1. IMPORT useAuth

// Mock data for dropdowns based on images
const specialties = ['All Specialties', 'Anxiety', 'Depression', 'CBT', 'Trauma', 'Couples Therapy', 'Teen Therapy', 'ADHD'];
const locations = ['All Locations', 'San Francisco, CA', 'Los Angeles, CA', 'Austin, TX', 'Seattle, WA', 'New York, NY', 'Chicago, IL'];
const sessionTypes = ['All Types', 'In-Person', 'Video Call', 'Phone Call'];
const insurances = ['All Insurance', 'Aetna', 'Blue Cross Blue Shield', 'Cigna', 'UnitedHealthcare'];

// Simple Dropdown Component
const CustomDropdown = ({ label, options, selectedValue, onChange }) => (
    <div className="relative">
        <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-violet-500 focus:border-violet-500 appearance-none bg-white pr-8 text-gray-700"
            value={selectedValue}
            onChange={onChange}
            aria-label={label}
        >
            {options.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
        </div>
    </div>
);

// New Component to Display a Single Therapist
const TherapistCard = ({ therapist }) => (
    <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-100 flex flex-col sm:flex-row justify-between hover:shadow-xl transition-shadow">
        <div className='flex-1'>
            <h3 className="text-xl font-bold text-gray-800">{therapist.name}</h3>
            <p className="text-violet-600 font-semibold mb-2">{therapist.specialty}</p>
            <p className="text-sm text-gray-600 mb-3">{therapist.bio}</p>
            
            <div className="flex items-center text-sm text-gray-500">
                <StarIcon className="w-4 h-4 text-amber-400 mr-1 fill-amber-400" />
                <span>{therapist.rating} Rating</span>
                <span className="mx-3 text-gray-300">|</span>
                <span>{therapist.location}</span>
            </div>
        </div>
        
        <div className='mt-4 sm:mt-0 sm:ml-6 flex-shrink-0 flex flex-col justify-end items-start sm:items-end space-y-2'>
            <div className='flex flex-wrap gap-2'>
                {therapist.sessions.map(session => (
                     <span key={session} className="text-xs font-medium bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">{session}</span>
                ))}
            </div>
            <button className="px-6 py-2 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700 transition-colors">
                View Profile
            </button>
        </div>
    </div>
);

const FindTherapistContent = () => {
    // State for Filters
    const [specialty, setSpecialty] = useState(specialties[0]); 
    const [location, setLocation] = useState(locations[0]);
    const [type, setType] = useState(sessionTypes[0]);
    const [insurance, setInsurance] = useState(insurances[0]);

    // State for API Data
    const [therapistList, setTherapistList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { getAuthHeader } = useAuth();

    // Function to fetch data from the backend API
    const fetchTherapists = useCallback(async () => {
        setLoading(true);
        setError(null);

        // Build query string based on selected filters (matching backend logic)
        const params = new URLSearchParams();
        if (specialty !== specialties[0]) params.append('specialty', specialty);
        if (location !== locations[0]) params.append('location', location);
        
        // Note: The mock backend only filters by specialty and location, 
        // but we'll include a placeholder for insurance/type logic if needed later.
        
        const queryString = params.toString();
        const apiUrl = `/api/therapists${queryString ? '?' + queryString : ''}`;

        try {
            const response = await fetch(apiUrl, {
                headers: getAuthHeader()
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setTherapistList(data);
        } catch (e) {
            console.error("Error fetching therapists:", e);
            setError("Failed to load therapist listings. Check if the backend is running.");
            setTherapistList([]);
        } finally {
            setLoading(false);
        }
    }, [specialty, location, getAuthHeader]); // Dependencies: Refetch when these filters change

    // useEffect to trigger the fetch function when filters change
    useEffect(() => {
        fetchTherapists();
    }, [fetchTherapists]);

    return (
        <div className='space-y-8'>
            
            {/* Crisis Warning Banner */}
            <div className='bg-red-50 border-l-4 border-red-500 rounded-lg p-5 flex justify-between items-center shadow-md'>
                <div className='flex items-center'>
                    <PhoneIcon className='w-6 h-6 text-red-500 mr-4' />
                    <div>
                        <p className='text-lg font-semibold text-red-700'>Need immediate support?</p>
                        <p className='text-sm text-red-600'>Crisis counselors available 24/7</p>
                    </div>
                </div>
                <a 
                    href="/crises-support" 
                    className="flex items-center px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors"
                >
                    Get Help Now
                </a>
            </div>

            {/* Find Your Perfect Match Filters */}
            <div className='bg-white rounded-2xl shadow-xl p-6'>
                <div className='flex items-center mb-6'>
                    <FunnelIcon className='w-6 h-6 text-violet-600 mr-2' />
                    <h2 className='text-xl font-bold text-gray-800'>Find Your Perfect Match</h2>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
                    {/* Search Bar */}
                    <div className="md:col-span-3 relative">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name or specialty..."
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-violet-500 focus:border-violet-500"
                        />
                    </div>
                    
                    {/* Specialty Dropdown */}
                    <CustomDropdown
                        label="Specialty"
                        options={specialties}
                        selectedValue={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                    />

                    {/* Location Dropdown */}
                    <CustomDropdown
                        label="Location"
                        options={locations}
                        selectedValue={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    
                    {/* Session Type Dropdown */}
                    <CustomDropdown
                        label="All Types"
                        options={sessionTypes}
                        selectedValue={type}
                        onChange={(e) => setType(e.target.value)}
                    />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    {/* Insurance Dropdown */}
                    <CustomDropdown
                        label="All Insurance"
                        options={insurances}
                        selectedValue={insurance}
                        onChange={(e) => setInsurance(e.target.value)}
                    />
                    
                    {/* Placeholder filter */}
                    <div className='h-full'></div>
                    
                    {/* Status/Count */}
                    <div className='h-full flex items-center justify-center md:justify-end'>
                         <p className='text-md font-semibold text-gray-500'>
                            {loading ? 'Searching...' : `Found ${therapistList.length} therapists`}
                        </p>
                    </div>
                </div>
            </div>

            {/* Therapist Listings (Replaces Placeholder Content) */}
            <div className='p-6 bg-white rounded-2xl shadow-xl space-y-4'>
                <h2 className='text-xl font-bold text-gray-800'>Search Results</h2>

                {error && <p className='text-red-500 text-center'>{error}</p>}
                
                {loading && (
                    <div className='text-center p-4 text-gray-500'>
                        <p>Loading therapist matches...</p>
                    </div>
                )}
                
                {!loading && therapistList.length > 0 && (
                    <div className='space-y-6'>
                        {therapistList.map(therapist => (
                            <TherapistCard key={therapist.id} therapist={therapist} />
                        ))}
                    </div>
                )}

                {!loading && !error && therapistList.length === 0 && (
                    <div className='text-center p-4 border border-gray-200 rounded-lg'>
                        <p className='text-gray-500'>No therapists found matching the selected filters. Try broadening your search criteria.</p>
                    </div>
                )}
            </div>
            
        </div>
    );
};

export default FindTherapistContent;