import express from "express";
import { getPublicSpaceController, postPublicSpaceController } from "../controllers/PublicSpace.js";
const router = express.Router();

router.post('/post', postPublicSpaceController)
router.post('/get', getPublicSpaceController);

export default router