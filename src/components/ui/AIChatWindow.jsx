import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import { PaperAirplaneIcon, SparklesIcon } from '@heroicons/react/24/outline'; // Import SparklesIcon
import { useAuth } from '../../context/AuthContext';

// Start with just the initial bot greeting
const initialMessages = [
    { type: 'bot', text: "Hello! I'm here to listen and support you. How are you feeling today?", time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) },
];

const AIChatWindow = () => {
    const [messages, setMessages] = useState(initialMessages);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false); // For loading state
    const chatEndRef = useRef(null); // To auto-scroll
    const { getAuthHeader } = useAuth();

    // Auto-scroll to bottom when new messages are added
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        const trimmedInput = input.trim();
        if (trimmedInput === '') return;

        const newTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
        
        // 1. Create new user message
        const newUserMessage = { 
            type: 'user', 
            text: trimmedInput, 
            time: newTime
        };

        // 2. Update UI immediately and set typing state
        setMessages(prev => [...prev, newUserMessage]);
        setInput('');
        setIsTyping(true);

        try {
            // 3. Send history AND new message to the backend
            const response = await fetch('/api/ai-chat', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    ...getAuthHeader()
                    // Note: Auth token is handled by the proxy, but if you secure
                    // this endpoint, you'd add getAuthHeader() here.
                },
                body: JSON.stringify({
                    // Send the history *before* this new message
                    history: messages, 
                    message: trimmedInput 
                })
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.reply || 'Network response was not ok');
            }

            const data = await response.json();

            // 4. Create new bot reply
            const botReply = {
                type: 'bot',
                text: data.reply || "Sorry, I couldn't get a response.",
                time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
            };

            // 5. Add bot reply to state
            setMessages(prev => [...prev, botReply]);

        } catch (error) {
            console.error("Full Gemini API Error:", error); // <-- ADD THIS LINE
            console.error("Error fetching AI reply:", error);
            const errorReply = {
                type: 'bot',
                text: error.message || "I'm having a little trouble connecting. Please try again.",
                time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
            };
            setMessages(prev => [...prev, errorReply]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="flex flex-col h-[75vh] bg-white rounded-2xl shadow-xl overflow-hidden">
            
            {/* Chat Messages Area */}
            <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                {messages.map((msg, index) => (
                    <ChatMessage 
                        key={index} 
                        type={msg.type} 
                        text={msg.text}
                        time={msg.time} 
                    />
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                    <div className="flex w-full my-4 justify-start">
                        <div className="flex-shrink-0 mr-3 self-end">
                            <span className='text-violet-600 p-2 rounded-full bg-violet-100'><SparklesIcon className='w-5 h-5'/></span>
                        </div>
                        <div className="p-3 shadow-md bg-violet-100 text-gray-500 rounded-r-xl rounded-bl-xl">
                            <p className='text-sm italic'>MindfulBot is typing...</p>
                        </div>
                    </div>
                )}
                
                {/* Empty div to scroll to */}
                <div ref={chatEndRef} />
            </div>

            {/* Chat Input Area */}
            <div className="border-t border-gray-200 p-4 bg-gray-50">
                <form onSubmit={handleSend} className="flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={isTyping ? "Waiting for response..." : "Share what's on your mind..."}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:ring-violet-500 focus:border-violet-500 text-gray-700"
                        disabled={isTyping} // Disable input while typing
                    />
                    <button
                        type="submit"
                        disabled={input.trim() === '' || isTyping} // Disable button
                        className={`ml-3 p-3 rounded-full transition-colors ${
                            (input.trim() === '' || isTyping)
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                            : 'bg-violet-600 text-white hover:bg-violet-700'
                        }`}
                    >
                        <PaperAirplaneIcon className="w-5 h-5 rotate-320 transform" />
                    </button>
                </form>
                <p className="text-xs text-gray-500 mt-2 text-center">
                    Press Enter to send • This conversation is private and secure
                </p>
            </div>
        </div>
    );
};

export default AIChatWindow;