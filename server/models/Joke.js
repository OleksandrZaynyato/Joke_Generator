import mongoose from "mongoose";

const jokeSchema = new mongoose.Schema(
    {
        setup: {
            type: String,
            required: true,
        },
        punchline: {
            type: String,
            required: true,
        },
        accepted: {
            type: Boolean,
            default: false,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: null
        },
        submittedBy: {
            type: String, // Could be user ID or username
            default: null,
        },

    },
    {
        collection: "Jokes",
    }
);

export default mongoose.model("Joke", jokeSchema);
