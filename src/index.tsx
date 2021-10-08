import { ColorModeScript } from "@chakra-ui/react";
import * as React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import { ProductProvider } from "./core/context";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
    </ChakraProvider>
    <ColorModeScript />
  </React.StrictMode>,
  document.getElementById("root")
);
