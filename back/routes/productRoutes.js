const express = require("express");
const router = express.Router();

const {
	uploadProduct,
	getProducts,
	deleteProduct,
} = require("../controllers/productController");
const upload = require("../middleware/upload");

router.post("/upload", upload.array("images", 5), uploadProduct);
router.get("/", getProducts);
router.delete("/:id", deleteProduct);
module.exports = router;
