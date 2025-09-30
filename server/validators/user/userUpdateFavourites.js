import yup from 'yup';
import mongoose from 'mongoose';

export const userUpdateFavouritesSchema = yup.object().shape({
    params: yup.object({
        id: yup.string().required('User ID is required').test('is-object-id', 'Invalid User ID', value => mongoose.Types.ObjectId.isValid(value)),
    }),
    // user: yup.object({
    //     id: yup.string().required('User ID is required').test('is-object-id', 'Invalid User ID', value => mongoose.Types.ObjectId.isValid(value)),
    // }),
})