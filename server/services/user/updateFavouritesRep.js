import User from '../../models/User.js';

export async function updateFavouritesRep(userId, jokeId) {
    try {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');

        let message = '';

        const index = user.favourites.findIndex(id => id.toString() === jokeId.toString());
        index === -1 ? user.favourites.push(jokeId) : user.favourites.splice(index, 1);
        message = index === -1 ? 'Joke added to favourites' : 'Joke removed from favourites';

        await user.save();
        return {user: user.toObject(), message};
    }
    catch (error) {
        throw new Error(`Error updating favourites: ${error.message}`);
    }
}