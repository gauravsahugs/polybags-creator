import * as yup from "yup";

const striosSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Strio Name Required")
    .min(3, "Name needs to of minimum of 3 characters")
    .max(50, "Strio Name is Too long!"),
  cost: yup
    .number()
    .typeError("Cost is Required")
    .positive("Must be a positive number")
    .required(),
  // description: yup
  //   .string()
  //   .trim()
  //   .required("Cost Description Required")
  //   .min(3, "Description must be of minimum of 3 characters")
  //   .max(50, "Description is Too long!"),
});

export default striosSchema;
