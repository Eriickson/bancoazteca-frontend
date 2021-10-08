import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const requiredField = "Este campo es requerido";

const schema = yup.object().shape({
  sku: yup.string().required(requiredField),
  name: yup.string().required(requiredField),
  description: yup.string().required(requiredField),
  price: yup.string().required(requiredField),
});

export const productValidationResolver = yupResolver(schema);
