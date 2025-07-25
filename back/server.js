const express = require("express");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const cors = require("cors");
const app = express();
app.use(cors({ origin: "http://localhost:5175" }));

require("dotenv").config();
console.log("Loaded CLOUD_NAME:", process.env.CLOUD_NAME);
console.log("Loaded API_KEY:", process.env.API_KEY);
console.log("Loaded API_SECRET:", process.env.API_SECRET);

// 中間件
app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);

// 連接到數據庫
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
