import mongoose from "mongoose";


const VideoSchema = new mongoose.Schema({
    video: String
})

const VideoPlayers = mongoose.model('VideoPlayers', VideoSchema);
export default VideoPlayers;