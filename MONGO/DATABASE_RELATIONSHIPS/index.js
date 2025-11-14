const mongoose = require('mongoose');

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDB2');
}

main().catch(err => console.log(err));

//One to Many Relationship Example

const orderSchema = new mongoose.Schema({
    item : String,
    price : Number
});

const customerSchema = new mongoose.Schema({
    name : String,
    email : String,
    orders : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }]
});

const Order = mongoose.model('Order', orderSchema);
const Customer = mongoose.model('Customer', customerSchema);

// const addCustomer = async () => {
//     let customer = new Customer({
//         name: 'Jane Smith',
//         email: 'jane.smith@example.com'
//     });

//     let order1 = await Order.findOne({ item: 'Laptop' });
//     let order2 = await Order.findOne({ item: 'Phone' });

//     customer.orders.push(order1);
//     customer.orders.push(order2);

//     let result = await customer.save();
//     console.log('Customer with orders saved:', result);
    
// }

// const addOrders = async() => {
//     await Order.deleteMany({});
//     let res = await Order.insertMany([
//         { item: 'Laptop', price: 1200 },
//         { item: 'Phone', price: 800 }
//     ]);
//     console.log("Orders added.");
// }

// async function run() {
//     await addOrders();
//     await addCustomer();
//     mongoose.connection.close();
// }

// run();

const findCustomerWithOrders = async () => {
    let customer = await Customer
        .findOne({ name: 'Jane Smith' })
        .populate('orders');
    console.log('Customer with populated orders:', customer);
}

findCustomerWithOrders();


