import Joke from "../models/Joke.js";

export async function getAllJokes(req, res) {
    try {
        const jokes = await Joke.find();
        res.json(jokes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getRandomJoke(req, res){
    try {
        const [joke] = await Joke.aggregate([{ $sample: { size: 1 } }]);
        res.json(joke);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}