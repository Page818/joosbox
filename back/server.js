const express = require("express");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const showcardRoutes = require("./routes/showcard");
const topImageRoutes = require("./routes/topImage");
const footerContentRoutes = require("./routes/footerContent");

const cors = require("cors");
const app = express();

require("dotenv").config();

console.log("Loaded CLOUD_NAME:", process.env.CLOUD_NAME);
console.log("Loaded API_KEY:", process.env.API_KEY);
console.log("Loaded API_SECRET:", process.env.API_SECRET);

// 中間件
app.use(cors()); // ✅ 開發階段使用這個最簡單
app.use(express.json());

// ✅ 掛載 API 路由
app.use("/api/products", productRoutes);
app.use("/api/showcards", showcardRoutes);
app.use("/api/topimages", topImageRoutes);
app.use("/api/footercontent", footerContentRoutes);

// 連接到數據庫
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
