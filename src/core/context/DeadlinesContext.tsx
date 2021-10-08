import React, { Context, createContext, FC, useContext, useState } from "react";

interface DeadlinesContextValues {
  deadlines: Deadlines[];
  getDeadliness(): Promise<void>;
  createDeadlines(product: Deadlines): Promise<void>;
  updateDeadlines(product: Partial<Deadlines>): Promise<Deadlines>;
  deleteDeadlines(id: string): Promise<void>;
}

const DeadlinesContext = createContext<DeadlinesContextValues | null>(
  null
) as Context<DeadlinesContextValues>;

const DeadlinesProvider: FC = ({ children }) => {
  const [deadlines, setDeadliness] = useState<Deadlines[]>([]);

  async function getDeadliness(): Promise<void> {
    console.log("Obtener productos");
  }

  async function createDeadlines(product: Deadlines) {
    console.log("createDeadlines", product);
  }

  async function updateDeadlines(
    product: Partial<Deadlines>
  ): Promise<Deadlines> {
    console.log("updateDeadlines", product);

    return {
      id: "123",
      normalRate: 12,
      punctualRate: 12,
      weeks: 12,
    };
  }

  async function deleteDeadlines(sku: string) {
    console.log("deleteDeadlines", sku);
  }

  return (
    <DeadlinesContext.Provider
      value={{
        deadlines,
        getDeadliness,
        createDeadlines,
        updateDeadlines,
        deleteDeadlines,
      }}
    >
      {children}
    </DeadlinesContext.Provider>
  );
};

const useDeadlines = () => useContext(DeadlinesContext);

export { useDeadlines, DeadlinesProvider };
