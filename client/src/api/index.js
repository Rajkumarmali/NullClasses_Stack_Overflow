import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:3001", });

API.interceptors.request.use((req) => {
    if (localStorage.getItem("Profile")) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("Profile")).token}`;
    }
    return req;
});

export const logIn = (authData) => API.post("/user/login", authData);
export const signUp = (authData) => API.post("/user/signup", authData);
export const postQuestion = (questionData) => API.post("/question/Que", questionData);
export const getAllQuestions = () => API.get("/get/allquestion");
export const deleteQuestion = (id) => API.delete(`/delete/question/${id}`);
export const postAnswer = (id, noOfAnswers, answerBody, userAnswered) => API.patch(`/answer/post/${id}`, { noOfAnswers, answerBody, userAnswered });
export const deleteAnswer = (id, answerId, noOfAnswers) => API.patch(`/delete/answer/${id}`, { answerId, noOfAnswers });
export const voteQuestion = (id, value, userId) => API.patch(`/vote/vote/${id}`, { value });
export const getAllUsers = () => API.get("/get/Allusers");
export const updateProfile = (id, updateData) => API.patch(`/update/user/${id}`, updateData);