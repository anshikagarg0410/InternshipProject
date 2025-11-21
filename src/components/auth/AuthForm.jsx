// src/components/auth/AuthForm.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AuthForm = ({ type }) => {
    const isLogin = type === 'login';
    const { login, register } = useAuth();
    const navigate = useNavigate(); // 💡 FIX: useNavigate is called here (inside the router)
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const action = isLogin ? login : register;
        const requiredFields = isLogin ? { email, password } : { name, email, password };
        
        const result = await action(...Object.values(requiredFields));

        if (result.success) {
            navigate('/'); // 💡 FIX: Navigation happens here after successful login/signup
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-xl shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                {isLogin ? 'Welcome Back!' : 'Join MindfulSpace'}
            </h2>
            
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-sm" role="alert">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500"
                    />
                )}
                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500"
                />
                <input
                    type="password"
                    placeholder="Password (min 6 chars)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-violet-600 text-white font-semibold rounded-lg shadow-md hover:bg-violet-700 transition-colors disabled:bg-gray-400"
                >
                    {loading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <Link to={isLogin ? "/signup" : "/login"} className="text-violet-600 font-semibold hover:text-violet-800">
                    {isLogin ? 'Sign Up' : 'Login'}
                </Link>
            </p>
        </div>
    );
};

export default AuthForm;