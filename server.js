const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({quiet: true});

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", () => res.send("Hello World"));

app.use(require("./modules/categories/categories.route"));
app.use(require("./modules/product/products.route"));
app.use(require("./modules/upload/upload.route"));
app.use(require("./modules/users/users.route"));


app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
  });
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
  console.log("Server running....");
});
