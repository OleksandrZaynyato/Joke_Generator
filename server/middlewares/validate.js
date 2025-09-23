import yup from 'yup';

export function validate(schema) {
    return async (req, res, next) => {
        try {
            const validatedData = await schema.validate(req.body, { abortEarly: false, stripUnknown: true });
            req.body = validatedData; // Replace req.body with the validated data
            next();
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                return res.status(400).json({
                    message: 'Validation Error',
                    errors: error.errors,
                });
            }
            next(error); // Pass other errors to the error handler
        }
    };
}
