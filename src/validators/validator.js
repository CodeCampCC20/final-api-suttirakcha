import * as Yup from "yup";

export const registerUserSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Password does not match").required("Confirm password is required")
})

export const registerDoctorSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Password does not match").required("Confirm password is required"),
  specialization: Yup.string().required("Specialization is required")
})

export const loginUserSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
})

export const validate = (schema) => async (err, req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
  } catch (error) {
    const errMessages = error.errors.map(err => err);
    const text = errMessages.join(",");
    const mergeErr = new Error(text);
    next(mergeErr);
  }
}