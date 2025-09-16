import Joke from "../models/Joke.js";
import {getBot} from "../bot/bot.js";

export async function getAllJokes(req, res) {
    try {
        const jokes = await Joke.find();
        res.json(jokes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getRandomJoke(req, res) {
    try {
        const [joke] = await Joke.aggregate([
            { $match: { accepted: true } },
            { $sample: { size: 1 } }
        ]);

        if (!joke) {
            return res.status(404).json({ message: "No accepted jokes found" });
        }
        res.json(joke);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
<<<<<<< HEAD
<<<<<<< Updated upstream
=======
=======
>>>>>>> 08e60fa20c3e9f7282095f0354b5b88448df0532
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
                        { text: "✅ Accept", callback_data: `accept_${joke._id.toString()}` },
                        { text: "❌ Reject", callback_data: `reject_${joke._id.toString()}` }
                    ]
                ]
            }
        });


        res.status(201).json(newJoke);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
<<<<<<< HEAD
>>>>>>> Stashed changes
=======
>>>>>>> 08e60fa20c3e9f7282095f0354b5b88448df0532
}