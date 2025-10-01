import * as yup from 'yup';

export function validate(schema) {
    return async (req, res, next) => {
        try {
            const validated = await schema.validate(
                { body: req.body, params: req.params, query: req.query },
                { abortEarly: false }
            );

            if (validated.body) req.body = validated.body;
            if (validated.params) Object.assign(req.params, validated.params);
            if (validated.query) Object.assign(req.query, validated.query);

            next();
        } catch (err) {
            console.error('Validation error:', err);
            return res.status(400).json({ message: 'Validation error', errors: err.errors });
        }
    };
}
