const mongoose = require('mongoose');

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDB3');
}

main().catch(err => console.log(err));

//One to Sequilion Relationship Example

const postSchema = new mongoose.Schema({
    title : String,
    content : String,
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const userSchema = new mongoose.Schema({
    name : String,
    email : String,
});

const Post = mongoose.model('Post', postSchema);
const User = mongoose.model('User', userSchema);

//

// const addData = async () => {    
//         let user1 = new User({
//         name: 'Alice Johnson',
//         email: 'alice.johnson@example.com'
//     });
    


//     let post = new Post({
//         title: 'My First Post',
//         content: 'This is the content of my first post.',
//     });

//     post.user = user1;

//     await user1.save();
//     await post.save();

//     console.log('Data added successfully.');



// }

// addData();


const addPosts = async() => {

    let user = await User.findOne({ name: 'Alice Johnson' });

    let post1 = new Post({
        title: 'My Second Post',
        content: 'This is the content of my second post.',
    });
    post1.user = user;

    let post2 = new Post({
        title: 'My Third Post',
        content: 'This is the content of my third post.',
    });
    post2.user = user;

    await post1.save();
    await post2.save();

    console.log('Posts added successfully.');
}

addPosts();




