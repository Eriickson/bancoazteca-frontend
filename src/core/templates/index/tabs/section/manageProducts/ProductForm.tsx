import React, { FC } from "react";

import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { FormErrorAlert } from "../../../../../components";
import { productValidationResolver } from "../../../../../../validations";

interface ProductFormProps {
  defaultValue?: Product;
  onSubmit(product: Product): void;
}

const sizes = ["S", "M", "L", "XL", "2XL"];
const materials = ["Algodón", "Lana", "Piel y Cuero", "Seda"];
const types = ["Zapato", "Tenis", "Pantalón", "Tshirt"];
const colors = [
  "Rojo",
  "Negro",
  "Amarillo",
  "Rosado",
  "Gris",
  "Verde",
  "Azul",
  "Marrón",
  "Blanco",
];

export const ProductForm: FC<ProductFormProps> = ({
  defaultValue,
  onSubmit,
}) => {
  const { register, handleSubmit, formState } = useForm<Product>({
    resolver: productValidationResolver,
    defaultValues: { ...defaultValue },
  });

  console.log(defaultValue);

  return (
    <form id="product-form" onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={3}>
        <FormControl id="name">
          <FormLabel mb="1">Nombre</FormLabel>
          <Input placeholder="Nombre" {...register("name")} />

          <FormErrorAlert name="name" errors={formState.errors} />
        </FormControl>
        <FormControl id="sku">
          <FormLabel mb="1">Tamaño</FormLabel>
          <Select
            errorBorderColor="red.300"
            placeholder="Tamaño"
            {...register("size")}
          >
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </Select>
          <FormErrorAlert name="material" errors={formState.errors} />
        </FormControl>
        <FormControl id="material">
          <FormLabel mb="1">Material</FormLabel>
          <Select
            errorBorderColor="red.300"
            placeholder="Material"
            {...register("material")}
          >
            {materials.map((material) => (
              <option key={material} value={material}>
                {material}
              </option>
            ))}
          </Select>
          <FormErrorAlert name="material" errors={formState.errors} />
        </FormControl>
        <FormControl id="color">
          <FormLabel mb="1">Color</FormLabel>
          <Select
            errorBorderColor="red.300"
            placeholder="Color"
            {...register("color")}
          >
            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </Select>
          <FormErrorAlert name="color" errors={formState.errors} />
        </FormControl>
        <FormControl id="typeGarment">
          <FormLabel mb="1">Tipo</FormLabel>
          <Select
            errorBorderColor="red.300"
            placeholder="Tipo"
            {...register("typeGarment")}
          >
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
          <FormErrorAlert name="typeGarment" errors={formState.errors} />
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
        <FormControl id="description">
          <FormLabel mb="1">Descripción</FormLabel>
          <Textarea placeholder="Descripción" {...register("description")} />

          <FormErrorAlert name="description" errors={formState.errors} />
        </FormControl>
      </VStack>
    </form>
  );
};
