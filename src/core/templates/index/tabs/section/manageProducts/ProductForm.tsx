import React, { FC } from "react";

import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { FormErrorAlert } from "../../../../../components";
import { productValidationResolver } from "../../../../../../validations";

interface ProductFormProps {
  defaultValue?: Product;
  onSubmit(product: Product): void;
}

export const ProductForm: FC<ProductFormProps> = ({
  defaultValue,
  onSubmit,
}) => {
  const { register, handleSubmit, formState } = useForm<Product>({
    resolver: productValidationResolver,
    defaultValues: { ...defaultValue },
  });

  return (
    <form id="product-form" onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={3}>
        <FormControl id="sku">
          <FormLabel mb="1">SKU</FormLabel>
          <Input
            errorBorderColor="red.300"
            placeholder="SKU"
            {...register("sku")}
          />
          <FormErrorAlert name="sku" errors={formState.errors} />
        </FormControl>
        <FormControl id="name">
          <FormLabel mb="1">Nombre</FormLabel>
          <Input placeholder="Nombre" {...register("name")} />

          <FormErrorAlert name="name" errors={formState.errors} />
        </FormControl>
        <FormControl id="description">
          <FormLabel mb="1">Descripción</FormLabel>
          <Input placeholder="Descripción" {...register("description")} />

          <FormErrorAlert name="description" errors={formState.errors} />
        </FormControl>
        <FormControl id="price">
          <FormLabel mb="1">Precio</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children="$"
            />
            <Input type="number" placeholder="Precio" {...register("price")} />
          </InputGroup>
          <FormErrorAlert name="price" errors={formState.errors} />
        </FormControl>
      </VStack>
    </form>
  );
};
