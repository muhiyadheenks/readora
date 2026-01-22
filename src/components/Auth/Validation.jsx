import * as yup from 'yup'

export const Validation = yup.object({
    name: yup.string()
        .min(4, "Name must be at least 4 characters")
        .required("Please enter your name"),

    email: yup.string()
        .email("Invalid email address")
        .required("Please enter your email"),
    phone: yup
        .string()
        .matches(/^[0-9]{10}$/, "Enter valid 10-digit phone number")
        .required("Phone number is required"),


    password: yup.string()
        .min(6, "Password must be at least 6 characters")
        .matches(/[A-Za-z]/, "Password must contain at least one letter")
        .required("Please enter your password"),

    cpassword: yup.string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Please confirm your password")
});