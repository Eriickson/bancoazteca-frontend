import React, { Context, createContext, FC, useContext, useState } from "react";
import { useAxios } from "../../hooks";
import toast from "react-hot-toast";

interface ProductContextValues {
  products: Product[];
  productSelected: Product | null;
  getProducts(): Promise<void>;
  createProduct(product: Product): Promise<boolean>;
  updateProduct(product: Partial<Product>): Promise<boolean>;
  deleteProduct(id: string): Promise<void>;
  setProductSelected(product: Product): void;
}

const ProductContext = createContext<ProductContextValues | null>(
  null
) as Context<ProductContextValues>;

function generateToaster(message: string, type: ToastHandler = "success") {
  toast[type](message);
}

const ProductProvider: FC = ({ children }) => {
  const { fetchData } = useAxios();

  const [products, setProducts] = useState<Product[]>([]);

  const [productSelected, setProductSelected] = useState<Product | null>(null);

  async function getProducts(): Promise<void> {
    const response = await fetchData({ url: "/product" });
    if (response?.data) setProducts(response?.data);
  }

  async function createProduct(product: Product): Promise<boolean> {
    try {
      const response = await fetchData({
        url: `/product`,
        method: "POST",
        body: product,
      });

      if (response.status === 409) {
        generateToaster(response.data.message, "error");
        return false;
      }

      if (response?.data) setProducts([...products, response.data]);

      generateToaster("Producto agregado correctamente");

      return true;
    } catch (err: any) {
      return false;
    }
  }

  async function updateProduct(productToUpdate: Product): Promise<boolean> {
    try {
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

        generateToaster("Producto actualizado");
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }

  async function deleteProduct(id: string) {
    try {
      await fetchData({ url: `/product/${id}`, method: "DELETE" });
      const newProducts = products.filter(({ _id }) => _id !== id);
      setProducts(newProducts);
      generateToaster("Producto eliminado");
    } catch (err) {}
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        productSelected,
        getProducts,
        createProduct,
        updateProduct,
        deleteProduct,
        setProductSelected,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

const useProduct = () => useContext(ProductContext);

export { useProduct, ProductProvider };
