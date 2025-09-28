import yup from "yup";
import mongoose from "mongoose";

export const jokeVoteSchema = yup.object().shape({
    params: yup.object({
        id: yup.string()
            .required("id is required")
            .test("is-objectid", "Invalid ObjectId", (value) =>
                mongoose.Types.ObjectId.isValid(value)
            ),
    }),
    body: yup.object({
        action: yup.string()
            .required("like is required")
            .oneOf(["like", "dislike"], "Action must be either 'like' or 'dislike'"),
        userId: yup.string()
            .optional()
            .test("is-objectid", "Invalid ObjectId", (value) =>
                value ? mongoose.Types.ObjectId.isValid(value) : true
            ),
    }),
});