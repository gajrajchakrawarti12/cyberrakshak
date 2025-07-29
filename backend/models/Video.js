import mongoose from "mongoose";
const videoSchema = new mongoose.Schema(
    {
        id:{
            type: String,
            required: true,
            unique: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        src: {
            type: String,
            required: true,
            unique: true,
        },
        category: {
            type: String,
            required: true,
            enum: ['Education', 'Entertainment', 'News', 'Sports', 'Technology'],
        },
        thumbnail: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);
export default Video;

