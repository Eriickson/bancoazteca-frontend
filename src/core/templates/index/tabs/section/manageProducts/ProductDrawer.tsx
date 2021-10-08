import React from "react";
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
} from "@chakra-ui/react";

import { SmallAddIcon } from "@chakra-ui/icons";
import { ProductForm } from "./ProductForm";

export const ProductDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);

  return (
    <>
      <Button
        aria-label="agregar un "
        rightIcon={<SmallAddIcon fontSize="2xl" />}
        ref={btnRef}
        colorScheme="teal"
        onClick={onOpen}
      >
        Nuevo producto
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Crea un nuevo producto</DrawerHeader>

          <DrawerBody>
            <ProductForm
              defaultValues={{
                sku: "123456789",
                name: "Product 1",
                description: "Esto es una breve descripcion",
                price: 12,
              }}
            />
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
