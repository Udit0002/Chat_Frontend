const API = "https://chat-backend-ofkg.onrender.com";

export async function sendMessage(message, sessionId) {
  const res = await fetch(`${API}/chat/message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, sessionId })
  });
  return res.json();
}

export async function getHistory(sessionId) {
  const res = await fetch(`${API}/chat/history/${sessionId}`);
  return res.json();
}