import React, { FC } from "react";

import {
  AlertDialog as AlertDialogChakra,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Box,
} from "@chakra-ui/react";

interface AlertDialogProps {
  title: string;
  subtitle: string;
  role: "red";
  onClickPrimaryButton?(): void;
  onClickSecondaryButton?(): void;
}

export const AlertDialog: FC<AlertDialogProps> = ({
  title,
  subtitle,
  children,
  role,
  onClickPrimaryButton,
  onClickSecondaryButton,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);

  return (
    <div>
      <Box onClick={() => setIsOpen(true)}>{children}</Box>
      <AlertDialogChakra
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>{subtitle}</AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => {
                  onClose();
                  onClickSecondaryButton && onClickSecondaryButton();
                }}
              >
                Cancel
              </Button>
              <Button
                colorScheme={role}
                onClick={() => {
                  onClose();
                  onClickPrimaryButton && onClickPrimaryButton();
                }}
                ml={3}
              >
                Sí, Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialogChakra>
    </div>
  );
};
