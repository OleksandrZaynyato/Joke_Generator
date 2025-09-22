import User from '../../models/User.js';

export async function getUserByEmailOrNameRep(loginValue) {
    try {
        const user = await User.findOne({
            $or: [
                { email: loginValue },
                { username: loginValue }
            ]
        });
        if (!user) {
            throw new Error('User not found');
        }
        return user.toObject();
    } catch (error) {
        throw new Error(`Error fetching user: ${error.message}`);
    }
}