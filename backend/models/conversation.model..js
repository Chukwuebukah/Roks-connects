// ...existing code...
const conversationSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  messages: [
    {
      text: String,
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Ensure sender references User
    },
  ],
}, { timestamps: true });
// ...existing code...
