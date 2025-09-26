import mongoose from "mongoose";

const jokeVoteSchema = new mongoose.Schema(
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
        votedAt: {
            type: Date,
            default: Date.now,
        },
        action: {
            type: String,
            enum: ["like", "dislike"],
            required: true,
        }
    },
    {
        collection: "JokeVotes",
    }
);

export default mongoose.model("JokeVotes", jokeVoteSchema);