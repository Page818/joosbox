// models/footerContent.js
import mongoose from "mongoose";

const footerContentSchema = new mongoose.Schema(
	{
		text: {
			type: String,
			required: true,
		},
		links: [
			{
				label: String, // 名稱，如 IG、Email、Shopee
				url: String, // 對應連結
			},
		],
	},
	{ versionKey: false }
);

export default mongoose.model("FooterContent", footerContentSchema);
