import * as yup from "yup";

const extrusionSchema = yup.object().shape({
  cost: yup
    .number()
    .typeError("Extrusion Required")
    .positive("Must be a positive number")
    .required(),
});

export default extrusionSchema;
