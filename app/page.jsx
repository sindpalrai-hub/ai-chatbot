"use client";

import { useState,useEffect,useRef } from "react";

export default function Home() {


  const [message, setMessage] = useState("");
const [personality, setPersonality] = useState("friend");
const [chat, setChat] = useState([]);
const messagesRef= useRef(null);

const bottomRef = useRef(null);
const chatEndRef = useRef(null);
const [showEmoji, setShowEmoji] = useState(false);

useEffect(() => {
  const container = messagesRef.current;

  if (container) {
    container.scrollTop = 
    container.scrollHeight;
  }
}, [chat]);

const personalities = [

  "friend",
  "best friend",
  "girlfriend",
  "boyfriend",
  "wife",
  "husband",
  "crush",
  "flirty girl",
  "cute anime girl",
  "anime boy",
  "waifu",
  "therapist",
  "motivator",
  "life coach",
  "teacher",
  "strict teacher",
  "english teacher",
  "math teacher",
  "science teacher",
  "history teacher",
  "coder",
  "senior software engineer",
  "hacker",
  "cyber security expert",
  "ethical hacker",
  "ai assistant",
  "jarvis",
  "business coach",
  "startup mentor",
  "finance advisor",
  "stock market expert",
  "crypto expert",
  "doctor",
  "fitness coach",
  "gym trainer",
  "nutritionist",
  "yoga instructor",
  "comedian",
  "sarcastic friend",
  "roaster",
  "poet",
  "shayari writer",
  "rapper",
  "story writer",
  "philosopher",
  "psychologist",
  "spiritual guru",
  "monk",
  "astrologer",
  "travel guide",
  "tour planner",
  "gaming buddy",
  "pro gamer",
  "free fire pro",
  "bgmi pro",
  "minecraft expert",
  "football coach",
  "cricket analyst",
  "news reporter",
  "detective",
  "lawyer",
  "judge",
  "police officer",
  "army commander",
  "chef",
  "barista",
  "fashion stylist",
  "makeup artist",
  "photographer",
  "video editor",
  "content creator",
  "youtuber",
  "streamer",
  "social media manager",
  "marketing expert",
  "sales expert",
  "customer support agent",
  "virtual assistant",
  "study partner",
  "debate master",
  "scientist",
  "space expert",
  "robot",
  "villain",
  "mafia boss",
  "pirate captain",
  "wizard",
  "superhero",
  "time traveler",
  "alien",
];
  const sendMessage = async () => {
    setChat((prev) => [
  ...prev,
  {
    role: "user",
    text: message,
  },
]);
setMessage("");

    const res = await fetch("/api/chat", {

      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        message,
        personality,
      }),
    });

    const data = await res.json();
    setChat((prev) => [
  ...prev,
  {
    role: "ai",
    text: data.reply,
  },
  ]);
  };

 return (
  <div>
  <div
  style={{
    padding: "10px 20px",
  }}
>
<select
  value={personality}
  onChange={(e) => {
    setPersonality(e.target.value);
  }}
  style={{
    padding: "10px",
    borderRadius: "10px",
    background: "#1f2937",
    color: "white",
    border: "none",
    width: "220px",
  }}
>
  {personalities.map((p, i) => (
    <option key={i} value={p}>
      {p}
    </option>
  ))}
</select>
   <div
    style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "#0f172a",
    }}
  >
  {/* CHAT AREA */}
  <div
    ref={messagesRef}
    style={{
      flex: 1,
      overflowY: "auto",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    }}
  >
    {chat.map((msg, index) => (
      <div
        key={index}
        style={{
          display: "flex",
          justifyContent:
            msg.role === "user"
              ? "flex-end"
              : "flex-start",
        }}
      >
        <div
          style={{
            background:
              msg.role === "user"
                ? "#2563eb"
                : "#1f2937",

            color: "white",
            padding: "14px 18px",
            borderRadius: "18px",
            maxWidth: "70%",
            wordBreak: "break-word",
          }}
        >
          {msg.text}
        </div>
      </div>
    ))}
  </div>

 {/* INPUT AREA */}
<div
  style={{
    padding: "12px",
    background: "#111827",
    position: "sticky",
    bottom: "0",
    zIndex: 100,
  }}
>
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      background: "#1f2937",
      borderRadius: "15px",
      padding: "10px",
    }}
  >
    <input
      type="text"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          sendMessage();
        }
      }}
      placeholder="Type a message..."
      style={{
        flex: 1,
        background: "transparent",
        border: "none",
        outline: "none",
        color: "white",
        fontSize: "16px",
      }}
    />

    <button
      onClick={() => setShowEmoji((s) => !s)}
      style={{
        background: "transparent",
        border: "none",
        color: "white",
        fontSize: "20px",
        cursor: "pointer",
      }}
    >
      {showEmoji ? "⌨️" : "😊"}
      
    </button>

    <button
      onClick={sendMessage}
      style={{
        background: "#2563eb",
        border: "none",
        color: "white",
        padding: "10px 16px",
        borderRadius: "10px",
        cursor: "pointer",
      }}
    >
      ➤
    </button>
  </div>

  {showEmoji && (
    <div
      style={{
        display: "flex",
        gap: "10px",
        padding: "10px",
        flexWrap: "wrap",
        background: "#1f2937",
        borderRadius: "10px",
        marginTop: "10px",
      }}
    >
      {["😀","😂","😍","😎","🔥","❤️"].map((emoji) => (
        <span
          key={emoji}
          onClick={() => setMessage((m) => m + emoji)}
          style={{
            fontSize: "24px",
            cursor: "pointer",
          }}
        >
          
          {emoji}
        </span>
      ))}
    </div>
  )}
      </div>
    </div>
  </div>
  </div>
    );
}
