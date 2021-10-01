var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var OrderSchema = new Schema({
  itemName: { type: String, required: true },
  units: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  photos: { type: Object, required: true },
  inCart: { type: Boolean, required: true },
  orderStatus: { type: String, required: true },
  refundRequested: { type: Boolean, required: true },
  paymentStatus: { type: String, required: false },
  user: { type: Schema.ObjectId, ref: "User", required: true },  
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
