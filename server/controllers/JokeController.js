import {
    getAllJokesService,
    getRandomJokeService,
    getJokeByIdService,
    createJokeService,
    updateJokeService,
    deleteJokeService, voteJokeService, getTopJokesService,
} from "../services/jokeService.js";
import { getBot } from "../bot/bot.js";

// Отримати всі жарти
export async function getAllJokes(req, res) {
    try {
        const jokes = await getAllJokesService();

        const formattedJokes = jokes.map(joke => ({
            id: joke._id.toString(),
            setup: joke.setup || "Без назви",
            punchline: joke.punchline || "Без змісту",
            accepted: joke.accepted || false,
            updatedAt: joke.updatedAt || new Date(),
            submittedBy: joke.submittedBy || "Невідомо",
            createdAt: joke.createdAt || new Date(),
        }));

        res.header("X-Total-Count", jokes.length.toString());
        res.json(formattedJokes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Випадковий жарт
export async function getRandomJoke(req, res) {
    try {
        const joke = await getRandomJokeService();
        if (!joke) return res.status(404).json({ message: "No accepted joke found" });
        res.json(joke);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Жарт за ID
export async function getJokeById(req, res) {
    try {
        const joke = await getJokeByIdService(req.params.id);
        if (!joke) return res.status(404).json({ message: "Joke not found" });

        res.json({
            id: joke._id.toString(),
            ...joke.toObject(),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Створення жарту
export async function createJoke(req, res) {
    try {
        const { setup, punchline } = req.body;
        const newJoke = await createJokeService({ setup, punchline });

        const bot = await getBot();
        const adminChatId = process.env.ADMIN_CHAT_ID;

        await bot.sendMessage(
            adminChatId,
            `🆕 New joke:\n\n${newJoke.setup}\n${newJoke.punchline}`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: "✅ Accept", callback_data: `accept_${newJoke._id.toString()}` },
                            { text: "❌ Reject", callback_data: `reject_${newJoke._id.toString()}` },
                        ],
                    ],
                },
            }
        );

        res.status(201).json(newJoke);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Оновлення
export async function updateJoke(req, res) {
    try {
        const updatedJoke = await updateJokeService(req.params.id, req.body);
        if (!updatedJoke) return res.status(404).json({ message: "Joke not found" });
        res.json(updatedJoke);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Видалення
export async function deleteJoke(req, res) {
    try {
        const joke = await deleteJokeService(req.params.id);
        if (!joke) return res.status(404).json({ message: "Joke not found" });

        res.json({
            id: joke._id.toString(),
            ...joke.toObject(),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Оцінка жарту
export async function voteJoke(req, res) {
    try {
        const jokeId = req.params.id;
        const ip = req.ip || req.connection.remoteAddress;
        const { action, userId } = req.body;

        const result = await voteJokeService(jokeId, userId, action, ip);

        res.json({ message: 'Joke rated successfully', joke: result.joke, jokeLike: result.jokeLike });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Топ жартів
export async function getTopJokes(req, res) {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const jokes = await getTopJokesService(limit);
        res.json(jokes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}