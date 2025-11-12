const mongoose = require('mongoose');
const Chat = require('./models/chats.js');

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsappDB');
}

main().then(() => {
    console.log("Connected to MongoDB successfully!");
}).catch(err => console.log(err));

let allChats = [
    {
        from: "Charlie",
        to: "Alice",
        message: "Hey Alice, are we still on for lunch tomorrow?",
        created_at: new Date()
    },
    {
        from: "Bob",
        to: "Charlie",
        message: "Hey Charlie, do you have the notes from yesterday's meeting?",
        created_at: new Date()
    },
    {
        from: "Alice",
        to: "Bob",
        message: "Sure, Charlie! Let's meet at our usual spot at 12 PM.",
        created_at: new Date()
    }
]

Chat.insertMany(allChats)