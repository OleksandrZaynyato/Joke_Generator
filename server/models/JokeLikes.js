import mongoose from "mongoose";

const jokeLikeSchema = new mongoose.Schema(
    {
        jokeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Joke",
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId, // Could be user ID or username
            ref: "User",
            default: null,
        },
        IP: {
            type: String, // Store user IP address
            required: true,
        },
        likedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        collection: "JokeLikes",
    }
);