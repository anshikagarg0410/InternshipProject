// khushisgh01/internshipproject/InternshipProject-8a5f69cd629fc2efec8342b72121374131129261/backend/routes/api.js

import express from 'express';
const router = express.Router();

// Import middleware and controllers
import { protect } from '../middleware/authMiddleware.js'; // 💡 NEW IMPORT
import journalController from '../controllers/journalController.js';
import chatController from '../controllers/chatController.js';
import exerciseController from '../controllers/exerciseController.js';
import therapistController from '../controllers/therapistController.js';
import communityController from '../controllers/communityController.js';

// --- JOURNAL Routes (REQUIRES AUTH) ---
// 💡 Apply 'protect' to all Journal routes
router.get('/journal', protect, journalController.getJournalEntries);
router.post('/journal', protect, journalController.createJournalEntry);
router.put('/journal/:id', protect, journalController.updateJournalEntry);
router.delete('/journal/:id', protect, journalController.deleteJournalEntry);


// --- EXERCISES Routes (REQUIRES AUTH) ---
// 💡 Apply 'protect' to all Exercises routes (assuming they track user progress)
router.get('/exercises', protect, exerciseController.getExercises);


// --- FIND THERAPIST Routes (Public, but often available to authenticated users) ---
// 💡 Protecting the list, as general practice in a fully authenticated app
router.get('/therapists', protect, therapistController.getTherapistListings);


// --- COMMUNITY SUPPORT Routes (REQUIRES AUTH) ---
// 💡 Protecting the post routes
router.get('/community', protect, communityController.getCommunityData);
router.post('/community/post', protect, communityController.createNewPost);
router.post('/community/post/:id/like', protect, communityController.likePost);
router.post('/community/post/:id/comment', protect, communityController.addComment);


// --- AI CHAT Route (REQUIRES AUTH) ---
router.post('/ai-chat', protect, chatController.getAIChatReply);


export default router;