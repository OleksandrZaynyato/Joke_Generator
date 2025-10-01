import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// 👇 ПРАВИЛЬНИЙ ШЛЯХ ДО .env ФАЙЛУ
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../../.env') }); // 👈 правильний шлях

import mongoose from 'mongoose';
import User from './models/User.js';

// 👇 ПРЯМЕ ПІДКЛЮЧЕННЯ БЕЗ DB.js
const MONGO_URI = process.env.MONGO_URI;

async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected ✅");
    } catch (error) {
        console.error("MongoDB connection error ❌:", error.message);
        console.log("MONGO_URI:", MONGO_URI); // 👈 Додамо для дебагу
        process.exit(1);
    }
}

await connectDB();

// Решта коду без змін...
const admins = [
    { telegramId: 1795893529, firstName: 'Святослав', role: 'admin' },
    { telegramId: 1188397898, firstName: 'Олександр', role: 'admin' },
    { telegramId: 1506727765, firstName: 'Максим', role: 'admin' }
];

for (const adminData of admins) {
    const adminUser = await User.findOneAndUpdate(
        { telegramId: adminData.telegramId },
        {
            telegramId: adminData.telegramId,
            firstName: adminData.firstName,
            role: 'admin'
        },
        { upsert: true, new: true }
    );
    console.log(`✅ Адмін створений: ${adminUser.firstName} (ID: ${adminUser.telegramId})`);
}

console.log('🎉 Всі три адміни створені!');
process.exit();