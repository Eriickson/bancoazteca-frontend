import React, { useEffect } from "react";
import { useProduct } from "../core/context";
import { IndexTemplate } from "../core/templates/index/IndexTemplate";

export const IndexPage = () => {
  const { getProducts } = useProduct();

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <IndexTemplate />
    </div>
  );
};
