import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sender, setSender] = useState("earth");
  const [receiver, setReceiver] = useState("mars");
  const [content, setContent] = useState("");
  const [sendDelay, setSendDelay] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/messages`,
          {
            params: { user: "mars" },
          }
        );
        setMessages(res.data.messages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setLoading(false);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const startTime = Date.now();
    const timestamp = new Date().toLocaleString();

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/messages`, {
        sender,
        receiver,
        content,
        timestamp,
      });

      const endTime = Date.now();
      const timeTaken = (endTime - startTime) / 1000;

      const delayInSeconds = res.data.data.deliveredAt
        ? (new Date(res.data.data.deliveredAt) -
            new Date(res.data.data.createdAt)) /
          1000
        : 0;

      setSendDelay(delayInSeconds);
      setContent("");
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleSender = () => {
    const newSender = sender === "earth" ? "mars" : "earth";
    const newReceiver = receiver === "earth" ? "mars" : "earth";
    setSender(newSender);
    setReceiver(newReceiver);
  };

  return (
    <div className="w-full h-[100vh] bg-gray-800 font-mono">
      <div className="mx-auto bg-gray-800  p-6 max-w-4xl ">
        <h1 className="text-2xl text-white font-bold text-center mb-4 headerr">
          Space Communication Delay Simulator
        </h1>

        <p className="text-gray-100 mb-2 text-center headerr">
          Experience how communication delays happen between planets! Light
          travels fast, but over millions of kilometers, even it takes minutes.
          Here you can send a message from Earth to Mars and observe the time
          delay!
        </p>

        <p className="text-gray-100 mb-2 text-center headerr">
        Read more in the about section or <a href="/about" className="text-blue-500">Click here</a></p>

        <p className="text-gray-100 mb-6 text-center headerr"><a className="text-blue-500" href="https://bichitrabehera-blue.vercel.app" target="_blank">Click here</a> to know more about the creator</p>

        <div className="mb-4">
          <label className="block text-gray-100 mb-2">
            Type a message to send...
          </label>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="flex-1 p-2 border border-gray-100"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white text-[14px] font-bold py-2 px-4 rounded"
            >
              Send
            </button>
          </form>
        </div>
        
        {sendDelay !== null && (
          <div className="mt-4 text-center text-gray-100">
            Message delay: {sendDelay.toFixed(2)} seconds
          </div>
        )}

        <div className="border-t border-gray-300 pt-4">
          <h2 className="text-lg font-semibold mb-2 text-white">Messages</h2>
          {loading ? (
            <div className="text-center text-gray-600">Loading messages...</div>
          ) : messages.length > 0 ? (
            <div className="space-y-2">
              {/* Reverse the messages array before mapping */}
              {[...messages].reverse().map((message, index) => (
                <div
                  key={message._id || index}
                  className="p-3 bg-gray-500 rounded shadow"
                >
                  <div className="font-semibold">
                    {message.sender === "earth" ? "🌍 Earth" : "🔴 Mars"} →
                    {message.receiver === "earth" ? "🌍 Earth" : "🔴 Mars"}
                  </div>
                  <div className="text-gray-100">{message.content}</div>
                  <div className="text-xs text-gray-100 mt-1">
                    Sent: {new Date(message.createdAt).toLocaleTimeString()} |
                    Delivered:{" "}
                    {message.deliveredAt
                      ? new Date(message.deliveredAt).toLocaleTimeString()
                      : "Pending..."}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600">No messages yet!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
