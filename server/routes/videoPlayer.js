import express from "express";
import { getvideoPlayerController, videoPlayerController } from "../controllers/videoPlayer.js";
const router = express.Router();

router.post('/post', videoPlayerController)
router.post('/get', getvideoPlayerController)

export default router