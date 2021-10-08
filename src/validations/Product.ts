import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const requiredField = "Este campo es requerido";

const schema = yup.object().shape({
  // sku: yup.string().required(requiredField),
  name: yup.string().required(requiredField),
  description: yup.string().required(requiredField),
  price: yup.number().required(requiredField),
  size: yup.string().required(requiredField),
  material: yup.string().required(requiredField),
  color: yup.string().required(requiredField),
  typeGarment: yup.string().required(requiredField),
});

export const productValidationResolver = yupResolver(schema);
