import User from '../../models/User.js';

export async function deleteUserRep(userId) {
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return { message: 'User deleted successfully' };
    } catch (error) {
        throw new Error(`Error deleting user: ${error.message}`);
    }
}