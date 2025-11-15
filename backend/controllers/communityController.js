// khushisgh01/internshipproject/InternshipProject-8a5f69cd629fc2efec8342b72121374131129261/backend/controllers/communityController.js

import { CommunityPost, CommunityGroup } from '../models/Community.js'; // 💡 NEW IMPORTS - Models

const getCommunityData = async (req, res) => {
    try {
        // Fetch posts and groups separately
        const posts = await CommunityPost.find().sort({ createdAt: -1 });
        const groups = await CommunityGroup.find();
        
        // Use .map() to explicitly trigger the virtuals/toJSON logic to include commentCount
        const postsWithCount = posts.map(post => post.toObject({ virtuals: true }));

        res.json({ posts: postsWithCount, groups }); // 💡 Return combined data structure
    } catch (error) {
        console.error("Error fetching community data:", error);
        res.status(500).json({ message: "Failed to fetch community data" });
    }
};

const createNewPost = async (req, res) => {
    const { text, tags, author = "Anonymous" } = req.body;
    
    try {
        const newPost = await CommunityPost.create({
            text,
            tags: tags || [],
            author,
        });

        // Return the new post with the virtual fields (like commentCount)
        res.status(201).json(newPost.toObject({ virtuals: true }));
    } catch (error) {
        console.error("Error creating new post:", error);
        res.status(500).json({ message: "Failed to create new post" });
    }
};

// 💡 NEW: Like a post
const likePost = async (req, res) => {
    const { id } = req.params;
    
    try {
        // Find the post and atomically increment the likes count
        const updatedPost = await CommunityPost.findByIdAndUpdate(
            id,
            { $inc: { likes: 1 } }, // Increment the 'likes' field by 1
            { new: true } // Return the updated document
        );

        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Return just the new like count
        res.json({ likes: updatedPost.likes });
    } catch (error) {
        console.error("Error liking post:", error);
        res.status(500).json({ message: "Failed to like post" });
    }
};

// 💡 NEW: Add a comment to a post
const addComment = async (req, res) => {
    const { id } = req.params;
    const { text, author } = req.body;
    
    // Simple validation
    if (!text) {
        return res.status(400).json({ message: "Comment text is required" });
    }

    try {
        const newComment = {
            text, 
            author: author || "Anonymous",
        };
        
        // Find the post and push the new comment into the array
        const updatedPost = await CommunityPost.findByIdAndUpdate(
            id,
            { $push: { comments: newComment } },
            { new: true } // Return the updated document
        );

        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Return the newly added comment object from the updated post (it's the last one)
        const savedComment = updatedPost.comments[updatedPost.comments.length - 1].toObject();
        
        res.status(201).json(savedComment);
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ message: "Failed to add comment" });
    }
};


export default {
    getCommunityData,
    createNewPost,
    // 💡 Export new functions
    likePost,
    addComment,
};