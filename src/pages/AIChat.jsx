import React from 'react';
import Sidebar from '../components/ui/Sidebar';
import AIChatWindow from '../components/ui/AIChatWindow'; 

const AIChat = () => {
    return (
        <div className='flex min-h-screen bg-gray-50'>
            {/* Set AI Chat as the initially active item for the sidebar */}
            <Sidebar initialActiveItem="AI Chat" />
            
            <div className='flex-1 p-8 overflow-y-auto'>
                <div className='max-w-4xl mx-auto'>
                    
                    {/* Header Section */}
                    <div className='flex justify-between items-center mb-6'>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">AI Support Chat</h1>
                            <p className='text-gray-500'>I'm here to listen and provide gentle support. This is a safe space for you.</p>
                        </div>
                        
                    </div>

                    {/* Disclaimer Box (from image_810555.jpg) */}
                    <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-lg mb-8">
                        <p className="text-gray-700 text-sm">
                            <span className="font-semibold mr-1">ⓘ</span>
                            This AI provides emotional support but isn't a replacement for professional therapy. If you're in crisis, please reach out to a mental health professional.
                        </p>
                    </div>
                    
                    {/* The main chat interface component */}
                    <AIChatWindow />
                </div>
            </div>
        </div>
    );
};

export default AIChat;