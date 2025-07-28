// routes/footerContent.js
const express = require("express");
const FooterContent = require("../models/footerContent");

const router = express.Router();

// 取得 Footer 資料
router.get("/", async (req, res) => {
	try {
		let content = await FooterContent.findOne();
		if (!content) {
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

module.exports = router; // ✅ 用 CommonJS 匯出
