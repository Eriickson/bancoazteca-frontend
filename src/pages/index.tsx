import React, { useEffect } from "react";
import { useDeadlines, useProduct } from "../core/context";
import { IndexTemplate } from "../core/templates/index/IndexTemplate";

export const IndexPage = () => {
  const { getProducts } = useProduct();
  const { getDeadlines } = useDeadlines();

  useEffect(() => {
    getProducts();
    getDeadlines();

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <IndexTemplate />
    </div>
  );
};
