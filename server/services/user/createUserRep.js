import bcrypt from 'bcryptjs';
import User from '../../models/User.js';

export async function createUserRep({email, username, password}) {
    try {
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            throw new Error('User with this email or username already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            username,
            password: hashedPassword,
            role: 'user'
        });

        await newUser.save();
        return newUser.toObject();
    } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
    }
}