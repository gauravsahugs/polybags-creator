import * as yup from "yup";

const tintSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Tint Name Required")
    .min(3, "Tint Name needs to of minimum of 3 characters")
    .max(50, "Tint Name is Too long!"),
  cost: yup
    .number()
    .typeError("Cost Required")
    .positive("Cost must be a positive number")
    .required(),
});

export default tintSchema;
