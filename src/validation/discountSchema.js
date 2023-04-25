import * as yup from "yup";

const discountSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Discount Name Required")
    .min(3, "Discount Name needs to of minimum of 3 characters")
    .max(50, "Discount Name is Too long!"),
  percentage: yup
    .number()
    .typeError("Discount Amount Required")
    .positive("Discount Amount must be a positive number")
    .required(),
});

export default discountSchema;
