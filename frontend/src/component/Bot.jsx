
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
function Bot() {
    const [messages,setMessages]=useState([])
    const [input,setInput]=useState("")
    const [loading,setLoading]=useState(false)
    const messagesEndRef=useRef(null)

     useEffect(()=>{
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    },[messages])

    const handleSendMessage = async () => {
        setLoading(true);
        if(!input.trim()) return;
        try {
            const res=await axios.post("http://localhost:4002/bot/v1/message",{
                text: input
            })
            if(res.status === 200) {
                setMessages([...messages, { text: res.data.userMessage, sender:'user'}, { text: res.data.botMessage, sender:'bot'}]);
               
            }
            console.log(res.data);
        } catch (error) {
            console.log("Error sending message:",error);
        }
        setInput("");
            setLoading(false);
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSendMessage()
    }
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#141414] to-[#1c1c1c] text-white">
  {/* Navbar & Header */}
  <header className="fixed top-0 left-0 w-full border-b border-gray-800/30 backdrop-blur-md bg-black/60 z-10 shadow-md">
    <div className="container mx-auto flex justify-between items-center px-6 py-4">
      <h1 className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
        BotSphere
      </h1>
      <FaUserCircle
        size={34}
        className="cursor-pointer text-gray-300 hover:text-green-400 transition-all duration-200 hover:scale-110"
      />
    </div>
  </header>

  {/* Chat Area */}
  <main className="flex-1 overflow-y-auto pt-24 pb-28 flex items-center justify-center">
    <div className="w-full max-w-3xl mx-auto px-4 flex flex-col space-y-5">
      {messages.length === 0 ? (
        <div className="text-center text-gray-400 text-xl font-light animate-fadeIn">
          👋 Hey there! I’m{" "}
          <span className="text-green-400 font-semibold">BotSphere</span>.  
          Ask me anything ✨
        </div>
      ) : (
        <>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`relative px-5 py-3 rounded-2xl shadow-lg max-w-[75%] transition-all animate-slideUp ${
                msg.sender === "user"
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white self-end rounded-br-none"
                  : "bg-gray-800/70 backdrop-blur-sm border border-gray-700 text-gray-100 self-start rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          ))}

          {loading && (
            <div className="bg-gray-700/70 text-gray-300 px-5 py-3 rounded-2xl max-w-[60%] self-start animate-pulse shadow-inner">
              Bot is typing...
            </div>
          )}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  </main>

  {/* Input & Footer */}
  <footer className="fixed bottom-0 left-0 w-full border-t border-gray-800/30 bg-black/70 backdrop-blur-md z-10 shadow-inner">
    <div className="max-w-3xl mx-auto flex justify-center px-4 py-3">
      <div className="w-full flex items-center bg-gray-900/70 rounded-full px-5 py-2 shadow-lg border border-gray-700/50 focus-within:border-green-500 transition-all">
        <input
          type="text"
          className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 px-2 text-sm"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={handleSendMessage}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-6 py-2 ml-2 rounded-full text-white font-medium transition-all duration-200 shadow-md hover:scale-105"
        >
          Send
        </button>
      </div>
    </div>
  </footer>
</div>
  )
}

export default Bot;