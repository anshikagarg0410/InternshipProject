import React, { useState, useEffect, useCallback } from 'react';
import { PlusIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'; 
import { useAuth } from '../../context/AuthContext'; // 1. IMPORT useAuth

// Internal component simulating a community post
const PostCard = ({ initials, name, tag, time, text, hashtags, likes, comments, postTagColor }) => {
    // Determine how long ago the post was made (using timestamp or mock time)
    const displayTime = time ? `${Math.floor((Date.now() - time) / (1000 * 60))} minutes ago` : 'just now';

    return (
        <div className="bg-white p-5 border-b border-gray-100">
            <div className='flex items-center mb-2'>
                <div className='w-10 h-10 flex items-center justify-center rounded-full bg-violet-100 text-violet-700 font-bold mr-3'>{initials}</div>
                <div>
                    <p className='font-semibold text-gray-800'>{name}</p>
                    {/* Display dynamically calculated time if timestamp exists */}
                    <p className='text-xs text-gray-500'>{time ? displayTime : 'just now'}</p> 
                    {/* Display dynamically calculated time if timestamp exists */}
                    <p className='text-xs text-gray-500'>{time ? displayTime : 'just now'}</p> 
                </div>
                {/* Tag logic is simplified for now */}
                {tag && <span className={`ml-auto px-2 py-0.5 text-xs font-medium rounded-full ${postTagColor}`}>{tag}</span>}
                {/* Tag logic is simplified for now */}
                {tag && <span className={`ml-auto px-2 py-0.5 text-xs font-medium rounded-full ${postTagColor}`}>{tag}</span>}
            </div>
            <p className='text-gray-700 mb-3 ml-12'>{text}</p>
            <div className='flex flex-wrap gap-2 mb-3 ml-12'>
                {hashtags.map(hash => (
                    <span key={hash} className="text-xs font-medium bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                        #{hash}
                    </span>
                ))}
            </div>
            <div className='flex items-center gap-4 ml-12 text-gray-500'>
                <div className='flex items-center cursor-pointer hover:text-red-500'>
                <div className='flex items-center cursor-pointer hover:text-red-500'>
                    <span className="mr-1 text-red-500">❤️</span>
                    <span>{likes}</span>
                </div>
                <div className='flex items-center cursor-pointer hover:text-gray-700'>
                <div className='flex items-center cursor-pointer hover:text-gray-700'>
                    <span className="mr-1 text-gray-400">💬</span>
                    <span>{comments}</span>
                </div>
            </div>
        </div>
    );
};


const CommunityFeedPlaceholder = () => {
    const [posts, setPosts] = useState([]);
    const [newPostText, setNewPostText] = useState('');
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState('All');
    const { getAuthHeader } = useAuth();

    // Filter tags derived from the mock data, used for the filter buttons
    const TagFilter = ({ tag }) => (
        <button 
            onClick={() => setSelectedFilter(tag)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                selectedFilter === tag
                    ? 'bg-violet-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
        >
            {tag}
        </button>
    );

    // Fetch posts and groups data on load
    const fetchCommunityData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/community', {
                headers: getAuthHeader()
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            // Assuming data is { posts: [...], groups: [...] }
            setPosts(data.posts || []);
        } catch (e) {
            console.error("Error fetching community data:", e);
            setError("Failed to load community feed. Check if the backend is running.");
        } finally {
            setLoading(false);
        }
    }, [getAuthHeader]);

    useEffect(() => {
        fetchCommunityData();
    }, [fetchCommunityData]);
    
    // Internal component simulating the share box
    const ShareBox = () => {

        const handleSubmit = async (e) => {
            e.preventDefault();
            if (newPostText.trim() === '') return;

            setIsSubmitting(true);
            setError(null);
            
            // Simple logic to extract hashtags for the mock post
            const tags = (newPostText.match(/#[a-z0-9]+/gi) || []).map(tag => tag.slice(1).toLowerCase());

            try {
                const response = await fetch('/api/community/post', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' ,...getAuthHeader()},
                    body: JSON.stringify({ 
                        text: newPostText.trim(), 
                        tags,
                        author: "Anonymous User" // Mock Author
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Server responded with status: ${response.status}`);
                }
                
                const newPost = await response.json();

                // Update frontend state with the new post at the top
                setPosts(prevPosts => [
                    { ...newPost, 
                        // Simulate initials/name for display consistency
                        initials: 'AU', 
                        name: 'Anonymous User', 
                        postTagColor: "bg-blue-100 text-blue-700" 
                    }, 
                    ...prevPosts
                ]);

                setNewPostText('');
            } catch (e) {
                console.error("Error submitting post:", e);
                setError("Failed to submit post. Please try again.");
            } finally {
                setIsSubmitting(false);
            }
        };

        return (
            <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-6">
                <div className="flex items-center text-gray-800 mb-4">
                    <span className="mr-2 text-xl">🔗</span>
                    <h3 className="font-semibold text-lg">Share Your Journey</h3>
                </div>
                
                <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500 text-gray-700 placeholder-gray-400 h-20 resize-none"
                    placeholder="Share something positive, a coping strategy that worked, or words of encouragement for others..."
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                    disabled={isSubmitting}
                ></textarea>
                
                <div className='flex justify-between items-center mt-3'>
                    <p className='text-sm text-gray-500'>Posts are anonymous and moderated for safety</p>
                    <button
                        onClick={handleSubmit}
                        disabled={newPostText.trim() === '' || isSubmitting}
                        className={`flex items-center px-4 py-2 text-white font-semibold rounded-lg transition-colors ${
                            newPostText.trim() === '' || isSubmitting
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-violet-600 hover:bg-violet-700'
                        }`}
                    >
                        {isSubmitting ? 'Posting...' : <><PlusIcon className="w-5 h-5 mr-1" />Share Anonymously</>}
                    </button>
                </div>
            </div>
        );
    };

    // Mapping tags to colors for consistent display
    const getTagColor = (tag) => {
        switch (tag.toLowerCase()) {
            case 'support': return 'bg-blue-100 text-blue-700';
            case 'mindfulness': return 'bg-green-100 text-green-700';
            case 'breathing': return 'bg-red-100 text-red-700';
            case 'gratitude': return 'bg-yellow-100 text-yellow-700';
            default: return 'bg-indigo-100 text-indigo-700';
        }
    };
    
    // Apply filter based on selected tag
    const filteredPosts = posts.filter(post => 
        selectedFilter === 'All' || post.tags.map(t => t.toLowerCase()).includes(selectedFilter.toLowerCase())
    );

    // Hardcoded filter options for now (could be derived from posts)
    const filterOptions = ['All', 'Support', 'Mindfulness', 'Gratitude', 'Breathing'];

    return (
        <div className="max-w-4xl mx-auto">
            <ShareBox />
            
            {error && (
                <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 border border-red-300" role="alert">
                    <ExclamationTriangleIcon className='w-5 h-5 mr-3'/>
                    <span className="font-medium">{error}</span>
                </div>
            )}
            
            {error && (
                <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 border border-red-300" role="alert">
                    <ExclamationTriangleIcon className='w-5 h-5 mr-3'/>
                    <span className="font-medium">{error}</span>
                </div>
            )}
            
            <h3 className='text-lg font-semibold text-gray-700 mb-4'>Recent Posts</h3>

            {/* Tags for filtering */}
            <div className="flex flex-wrap gap-3 mb-6 border-b pb-4">
                {filterOptions.map(tag => (
                    <TagFilter key={tag} tag={tag} />
                ))}
                {filterOptions.map(tag => (
                    <TagFilter key={tag} tag={tag} />
                ))}
            </div>

            {/* Post Feed */}
            {loading ? (
                <div className='text-center p-8 bg-white rounded-xl shadow-md'>
                    <p className='text-lg text-violet-600'>Loading community feed...</p>
                </div>
            ) : filteredPosts.length > 0 ? (
                <div className="bg-white rounded-lg shadow-md divide-y divide-gray-100">
                    {filteredPosts.map((post) => (
                        <PostCard 
                            key={post.id}
                            initials={post.author.slice(0, 1)}
                            name={post.author}
                            tag={post.tags[0] || 'General'}
                            time={post.timestamp} // Use timestamp for calculation
                            text={post.text}
                            hashtags={post.tags}
                            likes={post.likes}
                            comments={post.comments}
                            postTagColor={getTagColor(post.tags[0] || 'General')}
                        />
                    ))}
                </div>
            ) : (
                <div className='text-center p-4 border border-gray-200 rounded-lg'>
                    <p className='text-gray-500'>No posts found. Be the first to share something!</p>
                </div>
            )}
            {/* Post Feed */}
            {loading ? (
                <div className='text-center p-8 bg-white rounded-xl shadow-md'>
                    <p className='text-lg text-violet-600'>Loading community feed...</p>
                </div>
            ) : filteredPosts.length > 0 ? (
                <div className="bg-white rounded-lg shadow-md divide-y divide-gray-100">
                    {filteredPosts.map((post) => (
                        <PostCard 
                            key={post.id}
                            initials={post.author.slice(0, 1)}
                            name={post.author}
                            tag={post.tags[0] || 'General'}
                            time={post.timestamp} // Use timestamp for calculation
                            text={post.text}
                            hashtags={post.tags}
                            likes={post.likes}
                            comments={post.comments}
                            postTagColor={getTagColor(post.tags[0] || 'General')}
                        />
                    ))}
                </div>
            ) : (
                <div className='text-center p-4 border border-gray-200 rounded-lg'>
                    <p className='text-gray-500'>No posts found. Be the first to share something!</p>
                </div>
            )}
        </div>
    );
};

export default CommunityFeedPlaceholder;