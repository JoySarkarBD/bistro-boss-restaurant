import * as Yup from "yup";

const passwordRules = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
const emailRules = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const signupSchema = Yup.object({
  name: Yup.string().min(2).max(31).required("Name required"),
  email: Yup.string()
    .email()
    .matches(emailRules, { message: "Field should contain a valid e-mail" })
    .required("Email required"),
  password: Yup.string()
    .min(8)
    .max(20)
    .matches(passwordRules, {
      message: `Min 8 char and include at least 1 letter, 1 number and 1 special character!`,
    })
    .required("Password required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password don't match")
    .required("Confirm password is required"),
});

// login schema
export const signinSchema = Yup.object({
  email: Yup.string()
    .email()
    .matches(emailRules, { message: "Field should contain a valid e-mail" })
    .required("Email required"),
  password: Yup.string().min(8).max(20).required("Password required"),
});

// forget password
export const forgetPasswordSchema = Yup.object({
  email: Yup.string()
    .email()
    .matches(emailRules, { message: "Field should contain a valid e-mail" })
    .required("Email required"),
});

/* image: Yup.mixed()
    .nullable()
    .required()
    .test(
      "FILE_SIZE",
      "File is to large",
      (value) => !value || (value && value.size <= 1024 * 1024)
    )
    .test(
      "FILE_FORMAT",
      "File type is not supported",
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
    ), */
