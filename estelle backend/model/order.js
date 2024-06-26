const mongoose = require("mongoose");
let orderschema = mongoose.Schema({
  userId: String,
  orderProduct: { type: Array, required: true },
  orderPrice: { type: Number, required: true },
  isDone: { type: Boolean, default: false },
  paymentType: { type: String, required: true },
  startDate: Date,
});
let ordermodel = mongoose.model("Order", orderschema);
module.exports = ordermodel;
