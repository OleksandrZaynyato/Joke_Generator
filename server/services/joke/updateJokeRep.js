export async function updateJokeRep(MODEL, id, updateData) {
    try {
        const updatedJoke = await MODEL.findByIdAndUpdate(id, updateData, {new: true});
        if (!updatedJoke) {
            throw new Error('Joke not found');
        }
        return updatedJoke;
    } catch (error) {
        throw new Error(`Error updating joke: ${error.message}`);
    }
}