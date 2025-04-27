import React, { useState, useEffect } from "react";
import axios from "axios";

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/messages", {
          params: { user: "mars" }, 
        });
        setMessages(res.data.messages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setLoading(false);
      }
    };

    fetchMessages();

    // Polling to fetch messages every 5 seconds
    const interval = setInterval(() => {
      fetchMessages();
    }, 1000); // Fetch new messages every 5 seconds

    return () => clearInterval(interval); // Clean up the interval when the component is unmounted
  }, []);

  if (loading) {
    return (
      <div className="w-[50%]  bg-gray-100 flex flex-col p-10 justify-center items-center">
        <h2 className="text-4xl font-bold text-white mb-8">📡 Message List</h2>
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-[100%] h-[90vh] bg-gray-100 flex flex-col p-10 justify-center items-center  messagelist">
      <h2 className="text-4xl font-bold text-black mb-8">📡 Message List</h2>

      <ul className="space-y-2 w-full max-w-md max-h-[80vh] overflow-y-auto">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <li
              key={index}
              className="bg-white p-3 rounded-lg shadow-md"
            >
              <div className="flex items-center justify-between">
                <p className="text-gray-800">
                  {message.sender} ➔ {message.receiver}:
                </p>
                {/* <span className="text-sm text-gray-500">
                  {new Date()}
                </span> */}
              </div>
              <p className="text-gray-700 mt-1">{message.content}</p>
            </li>
          ))
        ) : (
          <li className="text-white">No messages yet!</li>
        )}
      </ul>
    </div>
  );
};

export default MessageList;
