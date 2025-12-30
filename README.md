🧠 AI Live Chat Support Agent

A full-stack AI-powered customer support chat system built as part of the Spur Founding Full-Stack Engineer assignment.
This application simulates a real customer support environment where users interact with an AI agent via a live chat interface, with full conversation persistence, session handling, and robust production-grade architecture.

⸻

🚀 Live Demo

Frontend: https://spur.uditchaudhary.in
Backend API: https://chat-backend-ofkg.onrender.com

⸻

#🧩 Features
	•	💬 Real-time chat interface
	•	🤖 AI responses using Google Gemini
	•	🧾 Conversation persistence with MongoDB
	•	🔄 Conversation history restored on refresh
	•	🧠 Context-aware replies using conversation history
	•	🛡️ Input validation and graceful error handling
	•	⚡ Clean, scalable backend architecture

⸻

🏗️ Tech Stack

Frontend
	•	React (Vite)
	•	Tailwind CSS
	•	React Markdown

Backend
	•	Node.js + TypeScript
	•	Express
	•	MongoDB (Mongoose)
	•	Google Gemini API

⸻

🧬 System Architecture
Client (React UI)
        ↓
REST API Layer (Express)
        ↓
Service Layer (LLM, Business Logic)
        ↓
Data Layer (MongoDB Models)
        ↓
External Systems (Google Gemini API)


## 🛠️ API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/chat/message` | Send message and receive AI reply |
| GET | `/chat/history/:sessionId` | Retrieve conversation history |

## 🛠️ Local Setup

### 1️⃣ Clone Repository

```bash
git clone <repo_url>
cd project
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

### Create `.env`

```env
PORT=3000
MONGO_URI=<your_mongodb_connection_string>
GEMINI_API_KEY=<your_gemini_api_key>
```

### ▶️ Run Backend

```bash
npm run dev
```


