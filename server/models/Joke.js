import mongoose from "mongoose";

const jokeSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
    },
    {
        collection: "jokes",
    }
);

export default mongoose.model("Joke", jokeSchema);
