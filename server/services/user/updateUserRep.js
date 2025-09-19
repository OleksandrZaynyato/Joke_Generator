import User from '../../models/User.js';

export async function updateUserRep(userId, data) {
    try {
        const user = await User.findByIdAndUpdate(userId, data, { new: true });
        if (!user) {
            throw new Error('User not found');
        }
        return { message: 'User updated successfully', user: user.toObject() };
    } catch (error) {
        throw new Error(`Error updating user: ${error.message}`);
    }
}