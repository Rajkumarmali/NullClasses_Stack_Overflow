import VideoPlayers from "../models/videoPlayers.js";

export const videoPlayerController = async (req, res) => {
    try {
        const { video } = req.body;
        const newVideo = new VideoPlayers({ video })
        await newVideo.save();
        res.send({
            success: true,
            message: "Successfully post your video "
        })
    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "Error in API"
        })
    }
}

export const getvideoPlayerController = async (req, res) => {
    try {
        const data = await VideoPlayers.find()
        res.send({
            success: true,
            data
        })
    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "Error in get data"
        })
    }
}