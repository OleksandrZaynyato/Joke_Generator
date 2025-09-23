import User from '../../models/User.js';

export async function getUserByIdRep(userId) {
    try {
        const user = await User.findById(userId); // Exclude password field
        if (!user) {
            throw new Error('User not found');
        }
        return user.toObject();
    } catch (error) {
        throw new Error(`Error fetching user: ${error.message}`);
    }
}