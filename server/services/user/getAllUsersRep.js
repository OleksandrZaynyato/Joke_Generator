import User from '../../models/User.js';

export async function getAllUsersRep() {
    try {
        const users = await User.find({}); // Exclude password field
        return users;
    } catch (error) {
        throw new Error(`Error fetching users: ${error.message}`);
    }
}