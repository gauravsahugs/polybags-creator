import * as yup from "yup";

const printingSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Color Name Required")
    .min(3, "Name needs to of minimum of 3 characters")
    .max(50, "Color Name is Too long!"),
  no_of_colors: yup
    .number()
    .typeError("Number of Required")
    .positive("Must be a positive number")
    .required(),

  // description: yup
  // 	.string()
  // 	.trim()
  // 	.required('Cost Description Required')
  // 	.min(3, 'Name needs to of minimum of 3 characters')
  // 	.max(50, 'Cost Description is Too long!'),
  cost: yup
    .number()
    .typeError("Total Cost Required")
    .positive("Must be a positive number")
    .required(),
});

export default printingSchema;
