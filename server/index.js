import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/users.js";
import questionRoutes from "./routes/Question.js"
import allquestion from "./routes/Question.js"
import answerRoutes from "./routes/Answers.js";
import deletQueRoutes from "./routes/Question.js"
import deleteAnsRoutes from "./routes/Answers.js"
import voteQuestionRoute from "./routes/Question.js"
import getAllUserRoute from "./routes/users.js"
import updateProfile from "./routes/users.js"
import videoRouter from "./routes/videoPlayer.js"
import publicSpaceRouter from "./routes/PublicSpace.js"
import textEditorRouter from "./routes/textEditor.js"

const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send("Welcome")
})

app.use('/user', userRoutes);
app.use('/question', questionRoutes);
app.use('/get', allquestion);
app.use('/answer', answerRoutes);
app.use('/delete', deletQueRoutes);
app.use('/delete', deleteAnsRoutes);
app.use('/vote', voteQuestionRoute);
app.use('/get', getAllUserRoute);
app.use('/update', updateProfile);
app.use('/video', videoRouter)
app.use('/publicSpace', publicSpaceRouter)
app.use('/textEditor', textEditorRouter)

const PORT = process.env.PORT || 3001;

const CONNECT_URL = "mongodb+srv://stackoverflow:stackoverflow@stackoverflow.eq8snaw.mongodb.net/?retryWrites=true&w=majority"


mongoose.connect(CONNECT_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`)
    })
}).catch((err) => console.log(err.message))

