import mongoose from "mongoose";

const LoginSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    browser: {
        type: String,
    },
    OS: {
        type: String,
    },
    deviceType: {
        type: String,
    },
    ipAddress: {
        type: String,
    },
    timeStemp: {
        type: Date,
        default: Date.now,
    }
})
const LoginInfos = mongoose.model("LoginInfos", LoginSchema);
export default LoginInfos;