const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const productroutes = require("./routes/productRoutes.js");
const orderroutes = require("./routes/orderRoutes.js");
const userroutes = require("./routes/userRoutes.js");
const adminroutes = require("./routes/adminRoutes.js");
const copounroutes = require("./routes/copounRoutes.js");
const ag = require("./controller/agregationController.js");
const path = require("node:path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(cookieParser());
app.listen(process.env.PORT, () => {
  console.log("server Started");
});
mongoose
  .connect(process.env.DB)
  .then(() => console.log("DB is connected"))
  .catch((err) => console.log(err));
app.use(express.static(path.join(__dirname, "/")));
app.use("/api", orderroutes);
app.use("/api", userroutes);
app.use("/api", productroutes);
app.use("/api", adminroutes);
app.use("/api", copounroutes);
app.get("/aggregation", ag.aggregation);
