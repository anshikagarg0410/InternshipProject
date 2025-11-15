// khushisgh01/internshipproject/InternshipProject-8a5f69cd629fc2efec8342b72121374131129261/backend/models/Community.js

import mongoose from 'mongoose';

// 💡 NEW: Schema for comments to be embedded in a post
const CommentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    author: { type: String, default: "Anonymous" },
}, { timestamps: true }); 

const CommunityPostSchema = new mongoose.Schema({
    text: { type: String, required: true },
    tags: { type: [String], default: [] },
    likes: { type: Number, default: 0 },
    comments: { type: [CommentSchema], default: [] }, // 💡 UPDATED: Now an array of embedded comments
    author: { type: String, default: "Anonymous" },
}, { timestamps: true });

// 💡 NEW: Virtual property to easily get the comment count (for compatibility with frontend mock)
CommunityPostSchema.virtual('commentCount').get(function() {
    return this.comments.length;
});

// Ensure virtuals are included when converting to JSON/Object
CommunityPostSchema.set('toJSON', { virtuals: true });
CommunityPostSchema.set('toObject', { virtuals: true });


const CommunityGroupSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    members: { type: Number, default: 0 },
    tag: { type: String },
});

// Explicitly name collections to match previous mock data conventions (posts, groups)
export const CommunityPost = mongoose.model('CommunityPost', CommunityPostSchema, 'posts'); 
export const CommunityGroup = mongoose.model('CommunityGroup', CommunityGroupSchema, 'groups');