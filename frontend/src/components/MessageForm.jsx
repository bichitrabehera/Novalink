import React, { useState } from "react";
import axios from "axios";

const MessageForm = () => {
  const [sender, setSender] = useState("earth");
  const [receiver, setReceiver] = useState("mars");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/messages", {
        sender,
        receiver,
        content,
      });
      console.log("Message sent:", res.data);
      setContent("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-[100%] h-[90vh] bg-gray-100 flex flex-col p-8 justify-center items-center">
      <h1 className="text-3xl font-bold text-black mb-8">🚀 Send a Message</h1>

      <form
        className="bg-white p-8 w-[400px] rounded-lg shadow-lg max-w-md space-y-6"
        onSubmit={handleSubmit}
      >
        {/* Sender */}
        <div className="flex flex-col">
          <label className="text-black font-semibold text-lg mb-1">
            Sender:
          </label>
          <select
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            className="p-1 rounded border focus:outline-none focus:ring-2 focus:ring-blue-700"
          >
            <option value="earth">Earth</option>
            <option value="mars">Mars</option>
          </select>
        </div>

        {/* Receiver */}
        <div className="flex flex-col">
          <label className="text-black font-semibold text-lg mb-1">
            Receiver:
          </label>
          <select
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            className="p-1 rounded border focus:outline-none focus:ring-2 focus:ring-blue-700"
          >
            <option value="mars">Mars</option>
            <option value="earth">Earth</option>
          </select>
        </div>

        {/* Message */}
        <div className="flex flex-col">
          <label className="text-black font-semibold text-lg mb-1">
            Message:
          </label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type your message here..."
            required
            className="p-1 rounded border focus:outline-none focus:ring-2 focus:ring-blue-700"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-500 hover:bg-blue-800 text-white font-bold py-2 px-4 w-[100px] rounded transition"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default MessageForm;
