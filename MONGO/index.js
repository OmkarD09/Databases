const mongoose = require('mongoose');


main().then(() => {
   console.log("Connected to MongoDB successfully!");
}).catch(err => console.log(err));

async function main() {
   await mongoose.connect('mongodb://127.0.0.1:27017/test');

}

const userSechema = new mongoose.Schema({
   name: String,
   age: Number,
   email: String
});

const User = mongoose.model('User', userSechema);
const Employee = mongoose.model('Employee', userSechema);

User.findByIdAndDelete("69132a7b28e64ebddc0add2d").then((res) => {
   console.log(res);
}).catch(err => console.log(err));

// User.findOneAndUpdate({name : "Alice Johnson"}, {age : 29}, {new : true}).then((res) => {
//    console.log(res);
// }).catch(err => console.log(err));

// User.findByIdAndUpdate("69132a7b28e64ebddc0add2d", {age : 29}, {new : true}).then((res) => {
//    console.log(res);
// }).catch(err => console.log(err));


// User.updateOne({name : "John Doe"}, {age : 36}).then((res) => {
//    console.log(res);
// }).catch(err => console.log(err));

// User.find({age : {$gt : 25}}).then(users => {
//    console.log("Users:", users);
// }).catch(err => console.log(err));
// User.findOne({name : "Jane Smith"}).then(user => {
//    console.log("User:", user);
// }).catch(err => console.log(err));

// User.findById("69132a7b28e64ebddc0add2d").then(user => {
//    console.log("User by ID:", user);
// }).catch(err => console.log(err));

// const user1 = new User({
//    name: "John Doe",
//    age: 30,
//    email: "john.doe@example.com"
// });

// const user2 = new User({
//    name: "Jane Smith",
//    age: 25,
//    email: "jane.smith@example.com"
// });

// user1.save().then(() => console.log("User 1 saved"));
// user2.save().then(() => console.log("User 2 saved"));

// User.insertMany([
//    { name: "Alice Johnson", age: 28, email: "alice.johnson@example.com" },
//    { name: "Bob Williams", age: 35, email: "bob.williams@example.com" },
//    { name: "Charlie Brown", age: 22, email: "charlie.brown@example.com" }
// ]).then(() => console.log("Users inserted"));