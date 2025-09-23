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
        rating: {
          type: Number,
            default: 0,
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
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false,
            default: null,
        },

    },
    {
        collection: "Jokes",
    }
);

export default mongoose.model("Joke", jokeSchema);
