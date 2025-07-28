// routes/footerContent.js
import express from "express";
import FooterContent from "../models/footerContent.js";

const router = express.Router();

// 取得 Footer 資料（只有一筆）
router.get("/", async (req, res) => {
	try {
		let content = await FooterContent.findOne();
		if (!content) {
			// 若不存在，建立一筆預設資料
			content = await FooterContent.create({
				text: "歡迎來到 JOO’s BOX",
				links: [],
			});
		}
		res.json(content);
	} catch (err) {
		res.status(500).send("伺服器錯誤");
	}
});

// 更新 Footer 資料
router.put("/:id", async (req, res) => {
	try {
		const updated = await FooterContent.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
			}
		);
		res.json(updated);
	} catch (err) {
		res.status(500).send("更新失敗");
	}
});

export default router;
