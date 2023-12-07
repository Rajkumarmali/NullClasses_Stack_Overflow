import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    editor: {
        type: String
    },
    code: String,
    video: String,

})
const TextEditor = mongoose.model("TextEditor", QuestionSchema);
export default TextEditor;