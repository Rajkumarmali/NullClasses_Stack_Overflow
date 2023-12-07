import express from "express";
import { getvideoPlayerController, videoPlayerController } from "../controllers/VideoPlayer.js";
const router = express.Router();

router.post('/post', videoPlayerController)
router.post('/get', getvideoPlayerController)

export default router