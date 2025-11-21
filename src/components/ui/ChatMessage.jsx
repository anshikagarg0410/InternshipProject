import React from 'react';
import { SparklesIcon } from '@heroicons/react/24/outline'; // Bot icon

const ChatMessage = ({ type, text, time, emoji }) => {
    // --- Styles based on message type ---
    const isBot = type === 'bot';
    
    // Message bubble styles
    const bubbleClasses = isBot 
        ? 'bg-violet-100 text-gray-800 self-start rounded-r-xl rounded-bl-xl' 
        : 'bg-violet-600 text-white self-end rounded-l-xl rounded-br-xl';
    
    // Container alignment
    const containerClasses = isBot ? 'justify-start' : 'justify-end';

    // Icon/Avatar placeholder: Only keep the bot's icon/avatar logic.
    const botIcon = <span className='text-violet-600 p-2 rounded-full bg-violet-100'><SparklesIcon className='w-5 h-5'/></span>;

    // The user icon/avatar is removed entirely, as the space is empty 
    // in the target design (image_812305.png) and the previous "hi" was an unintentional leftover.

    return (
        <div className={`flex w-full my-4 ${containerClasses}`}>
            
            {/* Bot Icon (Only displayed on the left for bot messages) */}
            {isBot && <div className="flex-shrink-0 mr-3 self-end">{botIcon}</div>}
            
            <div className={`flex flex-col max-w-xs md:max-w-md ${isBot ? 'items-start' : 'items-end'}`}>
                
                {/* Name/Status (Only for bot) */}
                {isBot && (
                    <div className='flex items-center mb-1'>
                        <p className='font-semibold text-sm text-gray-700 mr-2'>MindfulBot</p>
                        <span className='text-xs text-green-600 font-medium'>Online</span>
                    </div>
                )}
                
                {/* Message Bubble */}
                <div className={`p-3 shadow-md ${bubbleClasses}`}>
                    <p className='text-sm'>{text}</p>
                </div>

                {/* Timestamp */}
                <p className={`text-xs text-gray-500 mt-1 ${isBot ? 'mr-auto' : 'ml-auto'}`}>
                    {time}
                </p>
            </div>
            
            {/* We no longer render anything here for user messages */}
            {!isBot && <div className="flex-shrink-0 ml-3 self-end w-4 h-4"></div>}
        </div>
    );
};

export default ChatMessage;