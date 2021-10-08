import React, { Context, createContext, FC, useContext } from "react";

interface ProductContext {
  ping: string;
}

const ProductContext = createContext<ProductContext | null>(
  null
) as Context<ProductContext>;

const ProductProvider: FC = ({ children }) => {
  return (
    <ProductContext.Provider value={{ ping: "Pong" }}>
      {children}
    </ProductContext.Provider>
  );
};

const useProduct = () => useContext(ProductContext);

export { useProduct, ProductProvider };
