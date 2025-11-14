const mongoose = require('mongoose');

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDB');
}

main().catch(err => console.log(err));

// One to Few Relationship Example
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  addresses :[{
    street: String,
    city: String,
    state: String,
    zip: String
  }]
});

const User = mongoose.model('User', userSchema);

const createUserWithAddress = async () => {
  const user1 = new User({
    name: 'John Doe',
    email: 'john.doe@example.com',
    addresses: [
      {
        street: '123 Main St',
        city: 'Springfield',
        state: 'IL',
        zip: '62701'
      }
    ]
  });

  user1.addresses.push({
    street: '456 Elm St',
    city: 'Springfield',
    state: 'IL',
    zip: '62702'
    });

  await user1.save();
    console.log('User with addresses saved:', user1);
  }

    createUserWithAddress();

//One to Many Relationship Example
   