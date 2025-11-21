// khushisgh01/internshipproject/InternshipProject-8a5f69cd629fc2efec8342b72121374131129261/src/components/ui/Sidebar.jsx

import React from 'react';
import SidebarItem from './SidebarItem'; 
import { useAuth } from '../../context/AuthContext'; 
import { useNavigate } from 'react-router-dom'; // 💡 NEW IMPORT

const Sidebar = ({ initialActiveItem = 'Home' }) => {
  const { user, logout } = useAuth(); 
  const navigate = useNavigate(); // 💡 Use useNavigate here for the logout action
  const [activeItem, setActiveItem] = React.useState(initialActiveItem);

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  const NavSection = ({ title, items, isEmergency = false, isAdvanced = false }) => (
    <div className="mt-4">
      {title && <h3 className="text-xs font-semibold uppercase text-gray-400 mb-2 px-3">{title}</h3>}
      <div className="space-y-0">
        {items.map(item => (
          <SidebarItem
            key={item.text}
            icon={item.icon}
            text={item.text}
            to={item.to}
            isSelected={activeItem === item.text}
            isEmergency={isEmergency}
            isAdvanced={isAdvanced}
            onClick={() => setActiveItem(item.text)}
          />
        ))}
      </div>
    </div>
  );

  const mainNavItems = [
    { icon: '🏠', text: 'Home' , to: "/"}, 
    { icon: '💬', text: 'AI Chat' , to: "/ai-chat" }, 
    { icon: '📔', text: 'Journal', to: "/journel" },
    { icon: '🧘', text: 'Exercises' , to: '/exercises'},
  ];

  const advancedItems = [
    { icon: '🎶', text: 'Soundscapes' , to:'/soundscapes'},
    { icon: '🫂', text: 'Community Support' , to:'/community-support'}, 
    { icon: '🩺', text: 'Find Therapist', to: '/find-therapist' },
  ];
  
  const emergencyItem = [
    { icon: '📞', text: 'Crisis Support' , to:'/crises-support'},
  ];

  const profileSettings = [
    { icon: '👤', text: 'Profile & Settings' , to:'/profile-settings'},
  ];

  return (
    <div className="w-64 min-h-screen bg-white p-4 flex flex-col shadow-xl">
      
      {/* Top Section: Logo and Title */}
      <div className="flex items-center mt-4 mb-4">
        <div className="bg-violet-100 p-2 rounded-full mr-3">
          <span className="text-violet-600 text-xl">💜</span> 
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-800">MindfulSpace</h2>
          <p className="text-xs text-gray-500">Your wellness companion</p>
        </div>
      </div>

      {/* User Status / Login Link */}
      <div className="p-3 bg-gray-50 rounded-xl mb-4">
        {user ? (
          <>
            <p className="text-sm font-semibold text-gray-700">Welcome, {user.name}!</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </>
        ) : (
          <SidebarItem
            icon="➡️"
            text="Login / Sign Up"
            to="/login"
            isSelected={false}
            onClick={() => setActiveItem('Login / Sign Up')}
          />
        )}
      </div>

      {/* Main Navigation */}
      <NavSection title="MAIN" items={mainNavItems} />

      {/* Advanced Section */}
      <NavSection title="ADVANCED" items={advancedItems} isAdvanced={true} />
      
      {/* Emergency Section */}
      <NavSection title="EMERGENCY" items={emergencyItem} isEmergency={true} />
    
      {/* Profile & Settings */}
      {user && <NavSection items={profileSettings} isAdvanced={true} />}

      {/* Bottom Section: Logout/Dark Mode */}
      <div className="mt-auto pt-4">
        {user && (
          <div 
            onClick={handleLogout} 
            className="p-3 rounded-xl cursor-pointer text-red-600 hover:bg-red-50 flex items-center mb-2"
          >
            <span className="mr-3 text-lg">🚪</span>
            <span>Logout</span>
          </div>
        )}
        
        <div className="p-3 rounded-xl cursor-pointer text-gray-700 hover:bg-gray-100 flex items-center">
          <span className="mr-3 text-lg">🌙</span>
          <span>Dark Mode</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;