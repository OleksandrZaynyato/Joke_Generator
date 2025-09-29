import yup from "yup";
import mongoose from "mongoose";

function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isUsername(value) {
    return /^[a-zA-Z0-9._-]{3,20}$/.test(value);
}

export const userLoginSchema = yup.object().shape({
    body: yup.object().shape({
        loginValue: yup
            .string()
            .required("Login is required")
            .test("is-valid-login", "Must be valid username or email", (value) => {
                return isEmail(value) || isUsername(value);
            }),
        password: yup.string().required("Password is required"),
    })
});
