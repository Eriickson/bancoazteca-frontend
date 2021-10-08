import React, { useState } from "react";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import numeral from "numeral";
import { DeadlinesDrawer } from "./DeadlinesDrawer";
import { AlertDialog } from "../../../../../components";
import { useDeadlines } from "../../../../../context";

const deadlines: Deadlines[] = [
  {
    id: "1234",
    normalRate: 1.0485,
    punctualRate: 0.0689,
    weeks: 10,
  },
];

export const DeadlinesTable = () => {
  const [deadlinesSelected, setDeadlinesSelected] = useState<
    Deadlines | undefined
  >(undefined);

  const { deleteDeadlines } = useDeadlines();

  return (
    <Box>
      <HStack alignItems="flex-start" ml="4" mb="4">
        <DeadlinesDrawer
          type="UPDATE"
          defaultValue={deadlinesSelected}
          isDisabled={!Boolean(deadlinesSelected)}
        />
        <AlertDialog
          title="Eliminar Deadlineso"
          subtitle="Estás seguro de que quieres eliminar este deadlineso?"
          role="red"
          onClickPrimaryButton={() =>
            deadlinesSelected && deleteDeadlines(deadlinesSelected.id)
          }
        >
          <IconButton
            isDisabled={!Boolean(deadlinesSelected)}
            colorScheme="red"
            size="sm"
            icon={<DeleteIcon />}
            aria-label="Eliminar un deadlineso"
          />
        </AlertDialog>
      </HStack>
      <Table variant="striped" colorScheme="gray">
        <TableCaption>Listado de Plazos</TableCaption>
        <Thead>
          <Tr>
            <Th>Semanas</Th>
            <Th>Tasa Normal</Th>
            <Th>Tasa Puntual</Th>
          </Tr>
        </Thead>
        <Tbody>
          {deadlines.map((deadlines) => (
            <Tr
              key={deadlines.id}
              fontWeight={
                deadlines.id === deadlinesSelected?.id ? "semibold" : "normal"
              }
              onClick={() =>
                deadlinesSelected?.id === deadlines.id
                  ? setDeadlinesSelected(undefined)
                  : setDeadlinesSelected(deadlines)
              }
              cursor="pointer"
            >
              <Td>{deadlines.weeks}</Td>
              <Td>{numeral(deadlines.normalRate).format("0,0.0000")}</Td>
              <Td>{numeral(deadlines.punctualRate).format("0,0.0000")}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Semanas</Th>
            <Th>Tasa Normal</Th>
            <Th>Tasa Puntual</Th>
          </Tr>
        </Tfoot>
      </Table>
    </Box>
  );
};
