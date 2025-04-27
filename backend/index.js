const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connectDB } = require("./config/db");
const { Message } = require("./models/chatModel");
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

// const DELAY_MS = Math.floor(Math.random() * 100000) + 1;
// console.log(DELAY_MS);

app.post("/messages", async (req, res) => {
  try {
    const { sender, receiver, content } = req.body;
    const DELAY_MS = Math.floor(Math.random() * (60000 - 30000 + 1)) + 30000; // Random delay between 30s (30000 ms) and 1 minute (60000 ms)
    console.log(`Message will be delayed by ${DELAY_MS} ms`);

    const createdAt = new Date();
    const deliveredAt = new Date(createdAt.getTime() + DELAY_MS);

    const message = await Message.create({
      sender,
      receiver,
      content,
      createdAt,
      deliveredAt,
      isDelivered: false,
    });

    setTimeout(async () => {
      message.isDelivered = true;
      await message.save();
      console.log(`Message delivered: ${message.content}`);
    }, DELAY_MS);

    res.status(201).json({
      message: "Message sent and scheduled for delivery!",
      data: message,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/messages", async (req, res) => {
  try {
    const { user } = req.query;

    const messages = await Message.find({
      receiver: user,
      isDelivered: true,
    }).sort({ deliveredAt: 1 });

    res.json({ messages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

connectDB();
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
