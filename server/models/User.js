import mongoose from 'mongoose';

const User = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        telegramId: {type: Number, unique: true, sparse: true},
        
        firstName: String,
        lastName: String,
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
        favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Joke', default: [] }],
    },
    {
        collection: 'Users'
    }
)

export default mongoose.model('User', User);