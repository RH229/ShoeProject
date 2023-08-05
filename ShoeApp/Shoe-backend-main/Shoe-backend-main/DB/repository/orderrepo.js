const OrderModel = require("../models/ordermodel");
module.exports = {
  async addOrder(req) {
    console.log("repo ke andar", req);
      const order = new OrderModel({
        user: req.user,
        orderItems: {
          product: req._id,
          address: req.address,
          phoneno: req.phoneno,
          quantity: req.quantity,
          price: req.quantity * req.price,
        },
      });
      console.log("order ke andar", order);
     const result =  await OrderModel.create(order)
        if (!result) {
          console.log("error mai");
          reject(err);
        } else {
          console.log(result);
          console.log("save mai");
        }
      
    // );
  },
  async fetchOrders(id) {
    const result = await OrderModel.find({ user: id });
    if (result) {
      return result;
    } else {
      return null;
    }
  },
};
