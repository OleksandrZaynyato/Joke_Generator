import Joke from "../models/Joke.js";
import mongoose from "mongoose";
import JokeLikes from "../models/JokeLikes.js";

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

    const isJokeVotedByUser = await JokeLikes.find({ jokeId, IP: ip });
    if (isJokeVotedByUser.length > 0 && isJokeVotedByUser[0] === action){
        throw new Error("You have already voted for this joke");
    };

    if (action === "like") {
        joke.rating += 1;
    } else if (action === "dislike") {
        joke.rating -= 1;
    }

    const likeData = {
        jokeId,
        userId: userId || null,
        IP: ip,
    };

    const jokeLike = new JokeLikes(likeData);

    await jokeLike.save();
    await joke.save();

    return { joke, jokeLike };
}