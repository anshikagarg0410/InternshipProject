// src/pages/Auth.jsx

import React from 'react';
import AuthForm from '../components/auth/AuthForm';
import Sidebar from '../components/ui/Sidebar';
import { useParams } from 'react-router-dom';

// Note: Since App.jsx routes to /login and /signup, 
// we can use a single component here and differentiate the content.

const Auth = () => {
    // Use window.location.pathname or useParams to check if it's /login or /signup
    const isLoginPage = window.location.pathname.includes('/login');

    return (
        <div className='flex min-h-screen bg-gray-50'>
            {/* The Sidebar remains visible */}
            <Sidebar /> 
            
            <div className='flex-1 p-8 overflow-y-auto'>
                <AuthForm type={isLoginPage ? 'login' : 'signup'} />
            </div>
        </div>
    );
};

export default Auth;