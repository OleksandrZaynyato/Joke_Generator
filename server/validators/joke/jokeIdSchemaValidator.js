import * as Yup from "yup";
import mongoose from "mongoose";

export const jokeIdSchema = Yup.object({
    params: Yup.object({
        id: Yup.string()
            .required("id is required")
            .test("is-objectid", "Invalid ObjectId", (value) =>
                mongoose.Types.ObjectId.isValid(value)
            ),
    }),
});
