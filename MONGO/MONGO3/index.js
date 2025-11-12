const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Chat  = require('./models/chats.js');
const methodOverride = require('method-override');



const app = express();
const port = 3000;

app.set("views", path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));




async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsappDB');
}

main().then(() => {
    console.log("Connected to MongoDB successfully!");
}).catch(err => console.log(err));


app.use(express.static(path.join(__dirname, 'public')));


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.send('Welcome to the MongoDB and Express.js Application!');
    
});

// let chat1 = new chatModule.Chat({
//     from: "Alice",
//     to: "Bob",
//     message: "Hello, Bob! How are you?",
//     created_at: new Date()
// });

// chat1.save().then(() => {
//     console.log("Chat saved successfully!");
// }).catch(err => {
//     console.log("Error saving chat:", err);
// });

app.get('/chats', async (req, res) => {
        let chats = await Chat.find({});
        console.log(chats);
        res.render("index.ejs", { chats });


});

app.get('/chats/new', (req, res) => {
    res.render("newchat.ejs");
});

app.post('/chats', async (req, res) => {
    let newChat = new Chat({
        from: req.body.from,
        to: req.body.to,
        message: req.body.message,
        created_at: new Date()
    });

    await newChat.save();
    res.redirect('/chats');
});

app.get("/chats/:id", async (req, res) => {
    let chat = await Chat.findById(req.params.id);
    res.render("edit.ejs", { chat });
});

app.post("/chats/:id", async (req, res) => {
    await Chat.findByIdAndUpdate(req.params.id, {
        from: req.body.from,
        to: req.body.to,
        message: req.body.message,
        created_at: new Date()
    });
    res.redirect("/chats");
});

app.delete("/chats/:id", async (req, res) => {
   let { id } = req.params;
   await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
});