import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined in .env");
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// USE THE MODEL NAME FROM YOUR WANDERLUST PROJECT
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// This is your "System Prompt" to give the AI its personality and rules
const systemInstruction = `You are MindfulBot, a compassionate and supportive AI assistant for a mental wellness app. Your role is to listen, provide gentle support, and offer evidence-based mindfulness techniques or positive affirmations. You are NOT a therapist and must not provide medical advice or diagnoses. If a user seems to be in crisis, gently guide them to the "Crisis Support" section of the app or suggest they call 988. Be warm, empathetic, and concise.`;

const getAIChatReply = async (req, res) => {
    // Get history and the new message from the client
    const { history, message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    try {
        // 1. Format the history for the Gemini API
        const formattedHistory = [
            // Start with the system instruction
            { role: "user", parts: [{ text: systemInstruction }] },
            { role: "model", parts: [{ text: "I understand. I am ready to help." }] },
            // Map the app's chat history
            ...(history || []).map(msg => ({
                role: msg.type === 'bot' ? 'model' : 'user',
                parts: [{ text: msg.text }]
            }))
        ];

        // 2. Start the chat session with the formatted history
        const chat = model.startChat({
            history: formattedHistory,
            generationConfig: {
                maxOutputTokens: 1000,
            },
        });

        // 3. Send the user's new message
        const result = await chat.sendMessage(message);
        const response = result.response;
        const botResponse = response.text();

        // 4. Send the reply back to the frontend
        res.json({ reply: botResponse });

    } catch (error) {
        console.error("Full Gemini API Error:", error);
        res.status(500).json({ reply: "I'm having a little trouble thinking right now. Please try again in a moment." });
    }
};

export default {
    getAIChatReply,
};