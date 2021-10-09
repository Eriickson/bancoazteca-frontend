import React, { FC } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";

import { SmallAddIcon } from "@chakra-ui/icons";
import { EditIcon } from "@chakra-ui/icons";

import { ProductForm } from "./ProductForm";

import { useProduct } from "../../../../../context";
import { nanoid } from "nanoid";

interface ProductDrawerProps {
  defaultValue?: Product;
  isDisabled?: boolean;
  type?: "CREATE" | "UPDATE";
  onClick?(): void;
}

export const ProductDrawer: FC<ProductDrawerProps> = ({
  defaultValue,
  isDisabled,
  type = "CREATE",
  onClick,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);

  const { createProduct, updateProduct } = useProduct();

  async function onSubmit(values: Product) {
    const { size, material, color, typeGarment } = values;
    const sku = `${size}-${material.substring(0, 3)}-${color.substring(
      0,
      3
    )}-${typeGarment.substring(0, 3)}-${nanoid(6)}`.toUpperCase();
    values = {
      ...values,
      sku,
    };

    const response =
      type === "CREATE"
        ? await createProduct(values)
        : await updateProduct(values);
    response && onClose();
  }

  return (
    <>
      {type === "CREATE" ? (
        <Button
          aria-label="agregar un "
          rightIcon={<SmallAddIcon fontSize="2xl" />}
          ref={btnRef}
          colorScheme="teal"
          onClick={onOpen}
        >
          Nuevo producto
        </Button>
      ) : (
        <IconButton
          isDisabled={isDisabled}
          colorScheme="orange"
          size="sm"
          icon={<EditIcon />}
          aria-label="Editar un producto"
          onClick={() => {
            onOpen();
            onClick && onClick();
          }}
        />
      )}

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
        closeOnOverlayClick={false}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Crea un nuevo producto</DrawerHeader>

          <DrawerBody>
            <ProductForm defaultValue={defaultValue} onSubmit={onSubmit} />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="blue" form="product-form" type="submit">
              Guardar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
