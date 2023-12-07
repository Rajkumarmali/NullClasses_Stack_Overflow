import mongoose from "mongoose";

const publicSPacesSchema = new mongoose.Schema({
    content: String,
    media: String,
    type: String
})

const PublicSpace = mongoose.model("PublicSpace", publicSPacesSchema);
export default PublicSpace;