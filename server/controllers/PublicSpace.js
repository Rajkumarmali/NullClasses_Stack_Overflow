import PublicSpace from "../models/publicSpace.js";

export const postPublicSpaceController = async (req, res) => {
    const { content, media, type } = req.body;
    const abusive = ['abusive', 'hateful', 'offensive'];
    if (abusive.some(word => content.includes(word))) {
        return res.send({
            success: false,
            message: "Content contains abusive language",
        })
    }

    try {
        const newPost = new PublicSpace({ content, media, type })
        await newPost.save()
        res.send({
            success: true,
            message: "Post successful"
        })
    } catch (err) {
        res.send({
            success: false,
            message: "Error"
        })
    }
}
export const getPublicSpaceController = async (req, res) => {
    try {
        const data = await PublicSpace.find()
        res.send({
            success: true,
            data: data
        })
    } catch (err) {
        res.send({
            success: false,
            message: "Error"
        })
    }
}