import * as yup from "yup";

const bagSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Bag Name Required")
    .min(3, "Bag Name needs to of minimum of 3 characters")
    .max(50, "Bag Name is Too long!"),
  shape: yup
    .string()
    .trim()
    .required("Shape Required")
    .min(3, "Shape needs to of minimum of 3 characters")
    .max(50, "Shape is Too long!"),
  cost: yup
    .number()
    .typeError("Cost Required")
    .positive("Cost must be a positive number")
    .required(),
});

export default bagSchema;
