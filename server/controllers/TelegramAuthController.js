import User from '../models/User.js';

export const telegramAuth = async (req, res) => {
    try {
        const { id, first_name, last_name, username } = req.body;

        // Шукаємо користувача в базі по Telegram ID
        let user = await User.findOne({ telegramId: id });

        if (!user) {
            // Якщо не знайшли - створюємо нового (з ролью 'user')
            user = new User({
                telegramId: id,
                firstName: first_name,
                lastName: last_name,
                username: username,
                role: 'user' // За замовчуванням user
            });
            await user.save();
        }

        res.json({
            user: {
                telegramId: user.telegramId,
                firstName: user.firstName,
                role: user.role, 
                isAdmin: user.role === 'admin'
            }
        });

    } catch (error) {
        res.status(500).json({ error: 'Помилка сервера' });
    }
};