import React, { Context, createContext, FC, useContext } from "react";

interface ProductContextValues {
  ping: string;
}

const ProductContext = createContext<ProductContextValues | null>(
  null
) as Context<ProductContextValues>;

const ProductProvider: FC = ({ children }) => {
  return (
    <ProductContext.Provider value={{ ping: "Pong" }}>
      {children}
    </ProductContext.Provider>
  );
};

const useProduct = () => useContext(ProductContext);

export { useProduct, ProductProvider };
