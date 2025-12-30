import { useState, useRef, useEffect } from "react";
import "./App.css";
import ReactMarkdown from "react-markdown";
import { sendMessage, getHistory } from "./api";

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  const chatContainerRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, generatingAnswer]);

  // Load history on refresh
  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId");
    if (!sessionId) return;

    getHistory(sessionId).then(data => {
      const formatted = data.messages.map(m => ({
        type: m.sender === "user" ? "question" : "answer",
        content: m.text
      }));
      setChatHistory(formatted);
    });
  }, []);

  async function generateAnswer(e) {
    e.preventDefault();
    if (!question.trim()) return;
    if (question.length > 2000) {
      setChatHistory(prev => [...prev, { type: "answer", content: "Message too long. Please shorten your input." }]);
      return;
    }

    setGeneratingAnswer(true);

    const currentQuestion = question;
    setQuestion("");

    setChatHistory(prev => [...prev, { type: "question", content: currentQuestion }]);

    try {
      const sessionId = localStorage.getItem("sessionId");
      const data = await sendMessage(currentQuestion, sessionId);

      localStorage.setItem("sessionId", data.sessionId);

      setChatHistory(prev => [...prev, { type: "answer", content: data.reply }]);

    } catch {
      setChatHistory(prev => [...prev, { type: "answer", content: "⚠️ Service temporarily unavailable. Please try again." }]);
    }

    setGeneratingAnswer(false);
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="h-full max-w-4xl mx-auto flex flex-col p-3">

        <header className="text-center py-4">
          <h1 className="text-4xl font-bold text-blue-500">Chat AI</h1>
        </header>

        <div ref={chatContainerRef} className="flex-1 overflow-y-auto mb-4 rounded-lg bg-white shadow-lg p-4 hide-scrollbar">

          {chatHistory.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-400">
              Ask something to begin…
            </div>
          ) : (
            chatHistory.map((chat, index) => (
              <div key={index} className={`mb-4 ${chat.type === "question" ? "text-right" : "text-left"}`}>
                <div className={`inline-block max-w-[80%] p-3 rounded-lg ${
                  chat.type === "question"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                }`}>
                  <ReactMarkdown>{chat.content}</ReactMarkdown>
                </div>
              </div>
            ))
          )}

          {generatingAnswer && (
            <div className="text-left">
              <div className="inline-block bg-gray-100 p-3 rounded-lg animate-pulse">
                Agent is typing…
              </div>
            </div>
          )}

        </div>

        <form onSubmit={generateAnswer} className="bg-white rounded-lg shadow-lg p-4">
          <div className="flex gap-2">
            <textarea
              className="flex-1 border border-gray-300 rounded p-3 resize-none"
              value={question}
              onChange={e => setQuestion(e.target.value)}
              placeholder="Ask anything…"
              rows="2"
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  generateAnswer(e);
                }
              }}
            />
            <button
              disabled={generatingAnswer}
              className={`px-6 py-2 bg-blue-500 text-white rounded ${
                generatingAnswer ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
              }`}
            >
              Send
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default App;