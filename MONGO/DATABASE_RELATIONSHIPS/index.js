const mongoose = require('mongoose');

async function main() {
  await mongoose.connect('mongodb://localhost:27017/relationshipDemo');
}

main().catch(err => console.log(err));


const orderSchema = new mongoose.Schema({
    item: String,
    price: Number
});

const customerSchema = new mongoose.Schema({
    name: String,
    age: Number,
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }]
});



// Mongoose middleware to delete associated orders after a customer is deleted
customerSchema.post('findOneAndDelete', async function (customer) {
    // If a customer was found and deleted, and they have orders...
    if (customer && customer.orders.length > 0) {
        // ...delete all orders where the _id is in the customer's orders array.
        const deleteResult = await Order.deleteMany({ _id: { $in: customer.orders } });
        console.log(`Deleted ${deleteResult.deletedCount} associated order(s).`);
    }
});

const Order = mongoose.model('Order', orderSchema);
const Customer = mongoose.model('Customer', customerSchema);

// const addCustomerAndOrders = async () => {
//     const customer = new Customer({
//         name: 'John Doe',
//         age: 30
//     });

//     const order1 = new Order({
//         item: 'Laptop',
//         price: 1200
//     });

//     const order2 = new Order({
//         item: 'Mouse',
//         price: 25
//     });

//     await order1.save();
//     await order2.save();

//     customer.orders.push(order1);
//     customer.orders.push(order2);
//     await customer.save();
//     console.log("Customer and orders added:", customer);
// };

const deleteCustomerAndAssociatedOrders = async (customerId) => {
    console.log(`Attempting to delete customer with ID: ${customerId}`);
    const deletedCustomer = await Customer.findByIdAndDelete(customerId);
    if (deletedCustomer) {
        console.log("Customer deleted successfully:", deletedCustomer);
    } else {
        console.log("Customer not found.");
    }
};

// Run the functions

// addCustomerAndOrders();

deleteCustomerAndAssociatedOrders('691784177376d09f41266610');