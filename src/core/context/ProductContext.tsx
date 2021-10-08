import React, { Context, createContext, FC, useContext, useState } from "react";
import { useAxios } from "../../hooks";

interface ProductContextValues {
  products: Product[];
  getProducts(): Promise<void>;
  createProduct(product: Product): Promise<void>;
  updateProduct(product: Partial<Product>): Promise<void>;
  deleteProduct(id: string): Promise<void>;
}

const ProductContext = createContext<ProductContextValues | null>(
  null
) as Context<ProductContextValues>;

const ProductProvider: FC = ({ children }) => {
  const { fetchData } = useAxios();

  const [products, setProducts] = useState<Product[]>([]);

  async function getProducts(): Promise<void> {
    const response = await fetchData({ url: "/product" });
    if (response?.data) setProducts(response?.data);
  }

  async function createProduct(product: Product) {
    const response = await fetchData({
      url: `/product`,
      method: "POST",
      body: product,
    });

    if (response?.data) setProducts([...products, response.data]);
  }

  async function updateProduct(productToUpdate: Product): Promise<void> {
    const response = await fetchData({
      url: `/product/${productToUpdate._id}`,
      method: "PUT",
      body: productToUpdate,
    });

    if (response?.data) {
      const newProducts = products.map((product) =>
        product._id === productToUpdate?._id ? productToUpdate : product
      );

      setProducts(newProducts);
    }
  }

  async function deleteProduct(id: string) {
    await fetchData({ url: `/product/${id}`, method: "DELETE" });
    const newProducts = products.filter(({ _id }) => _id !== id);

    setProducts(newProducts);
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
