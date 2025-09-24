import Joke from "../models/Joke.js";
import mongoose from "mongoose";
import JokeVotes from "../models/JokeVotes.js";

// Отримати всі жарти
export async function getAllJokesService() {
    const jokes = await Joke.find();
    return jokes;
}

// Отримати випадковий жарт
export async function getRandomJokeService() {
    const [joke] = await Joke.aggregate([
        { $match: { accepted: true } },
        { $sample: { size: 1 } },
    ]);
    return joke;
}

// Отримати жарт за ID
export async function getJokeByIdService(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await Joke.findById(id);
}

// Створити новий жарт
export async function createJokeService(data) {
    const joke = new Joke(data);
    return await joke.save();
}

// Оновити жарт
export async function updateJokeService(id, updateData) {
    const joke = await Joke.findById(id);
    if (!joke) return null;

    if (updateData.setup !== undefined) joke.setup = updateData.setup;
    if (updateData.punchline !== undefined) joke.punchline = updateData.punchline;
    if (updateData.accepted !== undefined) joke.accepted = updateData.accepted;
    joke.updatedAt = new Date();

    return await joke.save();
}

// Видалити жарт
export async function deleteJokeService(id) {
    return await Joke.findByIdAndDelete(id);
}

// Оцінити жарт
export async function voteJokeService(jokeId, userId, action, ip) {
    const joke = await Joke.findById(jokeId);
    if (!joke) throw new Error("Joke not found");

    let vote = await JokeVotes.findOne({ jokeId, IP: ip });

    // 1. If vote exists and is the same → delete
    if (vote && vote.action === action) {
        await JokeVotes.findByIdAndDelete(vote._id);
        action === "like" ? joke.rating -= 1 : joke.rating += 1;

        await joke.save();
        return { message: `${action} was deleted successfully.`, joke, jokeVote: null };
    }

    // 2. If vote exists and is different → update
    if (vote && vote.action !== action) {
        vote.action = action;
        vote.votedAt = new Date();
        action === "like" ? joke.rating += 2 : joke.rating -= 2;

        await vote.save();
        await joke.save();
        return { message: `Vote was changed to ${action}.`, joke, jokeVote: vote };
    }

    // 3. If no vote exists → create
    const newVote = new JokeVotes({
        jokeId,
        userId: userId || null,
        IP: ip,
        action,
    });

    action === "like" ? joke.rating += 1 : joke.rating -= 1;

    await newVote.save();
    await joke.save();

    return { message: `Joke was ${action}d successfully.`, joke, jokeVote: newVote };
}
