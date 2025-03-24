import mongoose from "mongoose";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js"; // ✅ Import Message model

export const sendMessage = async (req, res) => {
    try {
        const { id: receiverId } = req.params; // ✅ Ensure receiverId is extracted properly
        const { message } = req.body; // ✅ Extract message from request body

        if (!message) {
            return res.status(400).json({ error: "Message content is required" });
        }

        if (!req.user) { // ✅ Ensure user is authenticated
            return res.status(401).json({ error: "Unauthorized" });
        }

        const senderId = req.user._id; // ✅ Ensure req.user exists (Middleware required)

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
                messages: [], // ✅ Initialize messages array
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        await newMessage.save(); // ✅ Save message to DB
        conversation.messages.push(newMessage._id);
        await conversation.save(); // ✅ Save conversation update

        return res.status(201).json(newMessage); // ✅ Ensure only one response is sent

    } catch (error) {
        console.error("Error sending message:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;

        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");

        if(!conversation)    return res.status(404).json([]);

        const messages = conversation.messages;
        return res.status(200).json(messages);
        
    } catch (error) {
        console.error("Error fetching messages:", error.message);
        res.status(500).json({ error: "Something went wrong" });
    }
};