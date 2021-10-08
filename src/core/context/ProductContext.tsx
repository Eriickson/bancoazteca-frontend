import React, { Context, createContext, FC, useContext, useState } from "react";

interface ProductContextValues {
  products: Product[];
  getProducts(): Promise<void>;
  createProduct(product: Product): Promise<void>;
  updateProduct(product: Partial<Product>): Promise<Product>;
  deleteProduct(id: string): Promise<void>;
}

const ProductContext = createContext<ProductContextValues | null>(
  null
) as Context<ProductContextValues>;

const ProductProvider: FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  async function getProducts(): Promise<void> {
    console.log("Obtener productos");
  }

  async function createProduct(product: Product) {
    console.log("createProduct", product);
  }

  async function updateProduct(product: Partial<Product>): Promise<Product> {
    console.log("updateProduct", product);

    return {
      sku: "",
      name: "",
      description: "",
      price: 123,
    };
  }

  async function deleteProduct(id: string) {
    console.log("deleteProduct", id);
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        getProducts,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

const useProduct = () => useContext(ProductContext);

export { useProduct, ProductProvider };
