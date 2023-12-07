import express from "express";
import { getTextEditorController, postTextEditorController } from "../controllers/textEditor.js";
const router = express.Router();

router.post('/post', postTextEditorController)
router.post('/get', getTextEditorController)

export default router