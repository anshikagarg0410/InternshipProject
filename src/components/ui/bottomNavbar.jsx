import React from 'react';
// 1. Import NavLink instead of Link
import { NavLink } from 'react-router-dom';
import { 
  Bars3Icon, 
  ChartBarIcon, 
  PlusIcon 
} from '@heroicons/react/24/outline';

const BottomNavBar = () => {

  // --- Helper strings for our classes ---

  // Base classes applied to all links
  const baseClasses = "flex-1 flex items-center justify-center py-2 px-3 rounded-full transition-colors duration-200";
  
  // Classes for the ACTIVE link (blue/white)
  const activeClasses = "bg-white text-blue-600 font-semibold shadow-md";
  
  // Classes for INACTIVE links (grey + hover effect)
  const inactiveClasses = "text-gray-600 hover:bg-gray-200";

  return (
    // Note: I removed `mt-10` as it seems unusual for a nav bar like this
    // and fixed `w-300` (not a valid class) to `max-w-md` (max-width: medium)
    <nav className="w-full bg-white p-2">
      <div className="flex justify-around items-center w-300 mt-10 mx-auto rounded-full bg-gray-100 p-1">
        
        {/* 2. Use NavLink and update the 'to' prop */}
        <NavLink 
          to="/journel" // <-- Changed from /journel
          // 3. Use a function for className to check if the link is active
          className={({ isActive }) => 
            `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
          }
        >
          <Bars3Icon className="h-5 w-5 mr-2" />
          Timeline
        </NavLink>


        {/* New Entry Link */}
        <NavLink 
          to="/journel/new-entry" // <-- Changed from /journel
          className={({ isActive }) => 
            `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
          }
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          New Entry
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNavBar;