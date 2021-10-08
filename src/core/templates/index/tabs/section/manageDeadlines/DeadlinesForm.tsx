import React, { FC } from "react";

import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Select,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { FormErrorAlert } from "../../../../../components";
import { deadlinesValidationResolver } from "../../../../../../validations";

interface DeadlinesFormProps {
  defaultValue?: Deadlines;
  onSubmit(product: Deadlines): void;
}

const weeksArray = Array(10).fill(null);

export const DeadlinesForm: FC<DeadlinesFormProps> = ({
  defaultValue,
  onSubmit,
}) => {
  const { register, handleSubmit, formState } = useForm<Deadlines>({
    resolver: deadlinesValidationResolver,
    defaultValues: { ...defaultValue },
  });

  return (
    <form id="deadlines-form" onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={3}>
        <FormControl id="sku">
          <FormLabel mb="1">Semanas</FormLabel>
          <Select
            errorBorderColor="red.300"
            placeholder="Semanas"
            {...register("weeks")}
          >
            {weeksArray.map((_, i) => {
              const value = i + 1 * 4;
              return (
                <option key={value} value={value}>
                  {value} Semanas
                </option>
              );
            })}
          </Select>
          <FormErrorAlert name="weeks" errors={formState.errors} />
        </FormControl>
        <FormControl id="name">
          <FormLabel mb="1">Tasa Normal</FormLabel>
          <Input placeholder="Tasa Normal" {...register("normalRate")} />
          <FormErrorAlert name="normalRate" errors={formState.errors} />
        </FormControl>
        <FormControl id="description">
          <FormLabel mb="1">Tasa Puntual</FormLabel>
          <Input placeholder="Tasa Puntual" {...register("punctualRate")} />
          <FormErrorAlert name="punctualRate" errors={formState.errors} />
        </FormControl>
      </VStack>
    </form>
  );
};
