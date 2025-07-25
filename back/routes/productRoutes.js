const express = require("express");
const router = express.Router();
const {
	uploadProduct,
	getProducts,
} = require("../controllers/productController");
const upload = require("../middleware/upload");

router.post("/upload", upload.array("images", 5), uploadProduct);
router.get("/", getProducts);

module.exports = router;
