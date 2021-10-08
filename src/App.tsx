import React from "react";
import { Box, Container } from "@chakra-ui/react";
import { IndexPage } from "./pages";

const App = () => {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgColor="gray.100"
    >
      <Container
        bgColor="white"
        p="4"
        rounded="md"
        shadow="md"
        maxW="container.lg"
        mx={[2, null, null, 0]}
      >
        <IndexPage />
      </Container>
    </Box>
  );
};

export default App;
