import TextEditor from "../models/textEditor.js";

export const postTextEditorController = async (req, res) => {
    try {
        const { editor, code, video } = req.body;
        const question = new TextEditor({ editor, code, video })
        await question.save();
        res.send({
            success: true,
            message: "Question Post successfully",
            question
        })
    } catch (err) {
        console.log(err);
        res.send({
            success: false,
            message: "Error in post API"
        })
    }
}

export const getTextEditorController = async (req, res) => {
    try {
        const data = await TextEditor.find();
        res.send({
            success: true,
            data: data
        })
    } catch (err) {
        res.send({
            success: false,
            message: "Error in get Data"
        })
    }
}