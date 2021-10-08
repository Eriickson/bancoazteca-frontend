import React from "react";
import { Button } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { SeachProductForm } from "./SeachProductForm";

export const SeachProductModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Button onClick={onOpen}>Buscar producto</Button>
      <Modal isCentered size="4xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Busca un producto</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SeachProductForm onClose={onClose} />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button form="search-product-form" type="submit" colorScheme="blue">
              Seleccionar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
