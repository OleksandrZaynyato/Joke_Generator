import Joke from '../models/Joke.js';
import { getBot } from '../bot/bot.js';

export async function getAllJokes(req, res) {
    try {
        const jokes = await Joke.find()

        console.log('📊 Знайдено жартів в test.Jokes:', jokes.length);

        // Форматуємо дані
        const formattedJokes = jokes.map(joke => ({
            id: joke._id.toString(),
            setup: joke.setup || "Без назви",
            punchline: joke.punchline || "Без змісту",
            accepted: joke.accepted || false,
            updatedAt: joke.updatedAt || new Date(),
            submittedBy: joke.submittedBy || "Невідомо",
            createdAt: joke.createdAt || new Date()
        }));

        res.header('X-Total-Count', jokes.length.toString());
        res.json(formattedJokes);
        // res.json(jokes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getRandomJoke(req, res) {
    try {
        const [joke] = await Joke.aggregate([{ $match: { accepted: true } }, { $sample: { size: 1 } }]);

        if (!joke) {
            return res.status(404).json({ message: 'No accepted jokes found' });
        }
        res.json(joke);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getJokeById(req, res) {
    try {
        const joke = await Joke.findById(req.params.id);
        if (!joke) {
            return res.status(404).json({ message: 'Joke not found' });
        }

        const formattedJoke = {
            id: joke._id.toString(),
            ...joke.toObject(),
        };
        res.json(formattedJoke);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function createJoke(req, res) {
    const { setup, punchline } = req.body;
    const joke = new Joke({ setup, punchline });
    try {
        const newJoke = await joke.save();

        const bot = await getBot();

        const adminChatId = process.env.ADMIN_CHAT_ID;
        await bot.sendMessage(adminChatId, `🆕 New joke:\n\n${joke.setup}\n${joke.punchline}`, {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: '✅ Accept', callback_data: `accept_${joke._id.toString()}` },
                        { text: '❌ Reject', callback_data: `reject_${joke._id.toString()}` },
                    ],
                ],
            },
        });

        res.status(201).json(newJoke);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export async function updateJoke(req, res) {
    try {
        const joke = await Joke.findById(req.params.id);
        if (!joke) {
            return res.status(404).json({ message: 'Joke not found' });
        }

        const { setup, punchline, accepted } = req.body;
        if (setup !== undefined) joke.setup = setup;
        if (punchline !== undefined) joke.punchline = punchline;
        if (accepted !== undefined) joke.accepted = accepted;
        joke.updatedAt = new Date();

        const updatedJoke = await joke.save();
        res.json(updatedJoke);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export async function deleteJoke(req, res) {
    try {
        const joke = await Joke.findByIdAndDelete(req.params.id);
        if (!joke) {
            return res.status(404).json({ message: "Joke not found" });
        }

        res.json({
            id: joke._id.toString(),
            ...joke.toObject(),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
