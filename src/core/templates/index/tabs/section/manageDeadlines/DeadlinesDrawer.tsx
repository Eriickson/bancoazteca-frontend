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
import { DeadlinesForm } from "./DeadlinesForm";
import { useDeadlines } from "../../../../../context";

interface DeadlinesDrawerProps {
  defaultValue?: Deadlines;
  isDisabled?: boolean;
  type?: "CREATE" | "UPDATE";
  onClick?(): void;
}

export const DeadlinesDrawer: FC<DeadlinesDrawerProps> = ({
  defaultValue,
  isDisabled,
  type = "CREATE",
  onClick,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);

  const { createDeadlines, updateDeadlines } = useDeadlines();

  async function onSubmit(values: Deadlines) {
    try {
      type === "CREATE"
        ? await createDeadlines(values)
        : await updateDeadlines(values);
      onClose();
    } catch (err) {}
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
          Nuevo Plazo
        </Button>
      ) : (
        <IconButton
          isDisabled={isDisabled}
          colorScheme="orange"
          size="sm"
          icon={<EditIcon />}
          aria-label="Editar un Deadlineso"
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
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Crea un nuevo Plazo Semanal</DrawerHeader>

          <DrawerBody>
            <DeadlinesForm defaultValue={defaultValue} onSubmit={onSubmit} />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="blue" form="deadlines-form" type="submit">
              Guardar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
