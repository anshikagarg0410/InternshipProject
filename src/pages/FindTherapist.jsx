import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/ui/Sidebar';
import HeroSection from '../components/ui/heroSection';
import TherapistNavbar from '../components/ui/TherapistNavbar'; // NEW IMPORT
import FindTherapistContent from '../components/ui/FindTherapistContent'; // Default content


const FindTherapist = () => {
    return (
        <div className='flex min-h-screen bg-gray-50'>
            <Sidebar initialActiveItem="Find Therapist" />
            <div className='flex-1 p-8 overflow-y-auto'>
                
                {/* Header Section */}
                <div className='mb-8 text-center'>
                    <HeroSection 
                        heading="Find Professional Support" 
                        subheading="Connect with licensed mental health professionals who can provide personalized care. All therapists are verified and specialize in evidence-based treatments." 
                    />
                </div>
                
                {/* Navigation Tabs (Find Therapists, Types of Therapy, Insurance & Costs) */}
                <TherapistNavbar />
                
                {/* Content based on Route (Outlet). Defaulting to FindTherapistContent if no sub-route is matched. */}
                <div className="mt-8">
                    <Outlet />
                    {/* Render default content if no specific outlet is matched (e.g., /find-therapist) */}
                    {/* Note: In App.jsx, we set FindTherapistContent as the index element. */}
                </div>
            </div>
        </div>
    );
};

export default FindTherapist;