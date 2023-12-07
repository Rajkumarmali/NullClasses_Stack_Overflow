import mongoose from "mongoose";
import Question from "../models/Question.js";

export const postAnswer = async (req, res) => {
    const { id: _id } = req.params;
    const { noOfAnswers, answerBody, userAnswered } = req.body;
    const userId = req.userId;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("question unavailable...");
    }
    updateNoOfQuestions(_id, noOfAnswers);
    try {
        const updatedQuestion = await Question.findByIdAndUpdate(_id, {
            $addToSet: { answer: [{ answerBody, userAnswered, userId }] },
        });
        res.status(200).json(updatedQuestion);
    } catch (error) {
        res.status(400).json("error in updating");
    }
}
const updateNoOfQuestions = async (_id, noOfAnswers) => {
    try {
        await Question.findByIdAndUpdate(_id, {
            $set: { noOfAnswers: noOfAnswers },
        });
    } catch (error) {
        console.log(error);
    }
};

export const deleteAnswer = async (req, res) => {
    const { id: _id } = req.params;
    const { answerId, noOfAnswers } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("Question unavailable...");
    }
    if (!mongoose.Types.ObjectId.isValid(answerId)) {
        return res.status(404).send("Answer unavailable...");
    }
    updateNoOfQuestions(_id, noOfAnswers);
    try {
        await Question.updateOne(
            { _id },
            { $pull: { answer: { _id: answerId } } }
        );
        res.status(200).json({ message: "Successfully deleted..." });
    } catch (error) {
        res.status(405).json(error);
    }
};
export const userAnswerController = async (req, res) => {
    const userId = req.body.userId;
    try {
        const questions = await Question.find({}); // Replace 'Question' with the actual model for questions
        const userAnswers = [];
        questions.forEach((question) => {
            const answers = question.answer.filter((ans) => ans.userId === userId);
            userAnswers.push(...answers);
        });

        return res.json(userAnswers);
    } catch (err) {
        console.log(err)
        return res.send("Error in get user answer");
    }
}