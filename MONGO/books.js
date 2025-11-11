const mongoose = require('mongoose');


main().then(() => {
   console.log("Connected to MongoDB successfully!");
}).catch(err => console.log(err));

async function main() {
   await mongoose.connect('mongodb://127.0.0.1:27017/amazonDB');

}

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        maxLength: 100
    },
    author:{
        type: String,
        required: true

    },
    price:{
        type: Number,
        required: true,
        min: [1, "Price must be at least 1"]
    },
    category:{
        type: String,
        required: true,
        enum: ['Fiction', 'Non-Fiction', 'Science', 'Biography', 'Children', 'Other']
    }
});

const Book = mongoose.model('Book', bookSchema);

const book1 = new Book({
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 10.99
});

book1.save().then(() => {
    console.log("Book saved successfully!");
}).catch(err => {
    console.log("Error saving book:", err);
});


    