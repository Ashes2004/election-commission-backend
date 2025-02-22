import express from "express";
import { getNewsByCategory, addNews, getAllNews } from "../controllar/newsControllar.js";

const router = express.Router();

router.get("/", getAllNews);
router.get("/:category", getNewsByCategory);
router.post("/", addNews);

export default router;
