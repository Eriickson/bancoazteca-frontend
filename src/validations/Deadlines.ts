import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const requiredField = "Este campo es requerido";

const schema = yup.object().shape({
  weeks: yup
    .number()
    .typeError("Debe de seleccionar una semana")
    .required(requiredField),
  normalRate: yup.number().typeError(requiredField).required(requiredField),
  punctualRate: yup.number().typeError(requiredField).required(requiredField),
});

export const deadlinesValidationResolver = yupResolver(schema);
