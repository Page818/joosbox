const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// cloudinary.config({
// 	cloud_name: process.env.CLOUD_NAME,
// 	api_key: process.env.API_KEY,
// 	api_secret: process.env.API_SECRET,
// });
cloudinary.config({
	cloud_name: "da1owallk",
	api_key: "954784585335347",
	api_secret: "5NCLEDPf8qE0-XYSN1B5yRTVOYA",
});

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: "necklaces",
		allowedFormats: ["jpg", "png", "jpeg"],
		transformation: [{ width: 800, height: 800, crop: "limit" }],
	},
});

const upload = multer({ storage: storage });

module.exports = upload;
