import express from "express";
import { deleteAnswer, postAnswer, userAnswerController } from "../controllers/Answer.js";
import auth from "../middlewars/auth.js";
const router = express.Router();

router.patch("/post/:id", auth, postAnswer);
router.patch("/answer/:id", auth, deleteAnswer);
router.post('/user-answer', userAnswerController)

export default router;