import yup from 'yup';

export const createJokeSchema = yup.object().shape({
    body: yup.object({
        setup: yup.string().required('Setup is required').min(10, 'Setup must be at least 10 characters long').max(200, 'Setup cannot exceed 200 characters'),
        punchline: yup.string().required('Punchline is required').min(3, 'Punchline must be at least 3 characters long').max(100, 'Punchline cannot exceed 100 characters'),
        rating: yup.number().optional(),
        accepted: yup.boolean().optional(),
        createdBy: yup.string().optional(),
    })
});