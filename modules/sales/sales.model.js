const { default: mongoose } = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      require: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      require: true,
    },
    totalAmount: {
      type: Number,
      require: true,
      min: 0,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          require: true,
        },
        productName: {
          type: String,
          require: true,
        },
        quantity: {
          type: Number,
          require: true,
          min: 1,
        },
        price: {
          type: Number,
          require: true,
          min: 0,
        },
      },
    ],
    note: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const SaleModel = mongoose.model("sales", saleSchema);
module.exports = SaleModel;
