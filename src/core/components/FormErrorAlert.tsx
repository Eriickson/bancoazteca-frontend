import React, { FC } from "react";
import { FormHelperText } from "@chakra-ui/react";
import { FieldError } from "react-hook-form";

interface FormErrorAlertProps {
  name: string;
  errors: Record<any, FieldError>;
}

export const FormErrorAlert: FC<FormErrorAlertProps> = ({ errors, name }) => {
  return (
    <div>
      {errors[name] && (
        <FormHelperText color="red">{errors[name].message}</FormHelperText>
      )}
    </div>
  );
};
