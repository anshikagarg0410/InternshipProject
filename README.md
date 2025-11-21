## 💜 MindfulSpace: Your Personal Mental Wellness Companion

MindfulSpace is a comprehensive, full-stack application built to support emotional well-being through AI, structured journaling, and resource management.

-----

### ✨ Core Features

  * **AI Support Chat (MindfulBot):** Empathetic, Gemini-powered assistant offering immediate support and mindfulness techniques.
  * **Mood Journal:** Track emotional journeys with tagging and full CRUD operations.
  * **Wellness Exercises:** Guided library including **Breathing** (`4-7-8`, `Box Breathing`) and **Mindfulness** exercises.
  * **Ambient Soundscapes:** Audio controls, timer, and presets for focus or sleep (e.g., `Gentle Rain`).
  * **Crisis & Safety:** Instant access to crisis lines (`988`) and a personalized, downloadable **Safety Plan** creator.
  * **Find a Therapist:** Filterable search for verified professionals and educational content (CBT, DBT).
  * **Community:** Anonymous, moderated peer support feed and groups.

-----

### 🏗️ Architecture & Stack

| Component | Technology | Details |
| :--- | :--- | :--- |
| **Backend** | Node.js / Express.js | REST API, Protected Routes (JWT). |
| **Frontend** | React (Vite) / Tailwind CSS | Fast development environment with a modern utility-first CSS framework. |
| **Database** | MongoDB / Mongoose | Scalable, document-based data persistence. |
| **Dev Flow** | `concurrently` & `Vite Proxy` | Simultaneous running of frontend and backend servers; API calls proxied to Node. |

### 📂 Project Structure

```
.
├── backend/
│   ├── controllers/      # API Logic (Journal, Chat, Auth)
│   ├── models/           # Mongoose Schemas (User, JournalEntry)
│   └── middleware/       # JWT Authentication Layer
├── src/
│   ├── components/
│   │   └── ui/           # Shared UI Components (Sidebar, Cards)
│   ├── context/          # AuthContext for JWT management
│   └── pages/            # Main Views (Home, AIChat, Journel)
└── .env                  # Configuration
```

-----

### 🚀 Quick Run Instructions

1.  **Prerequisites:** Node.js (v18+), MongoDB, and a Gemini API Key.
2.  **Install:**
    ```bash
    npm install
    ```
3.  **Configure:** Create a `.env` file and populate it:
    ```dotenv
    MONGO_URI="..."
    JWT_SECRET="..."
    GEMINI_API_KEY="..."
    ```
4.  **Start:** Run both the Express backend and the React frontend simultaneously:
    ```bash
    npm run dev
    # Frontend available at: http://localhost:5173
    # Backend API at: http://localhost:3001/api
    ```