import React, { Context, createContext, FC, useContext, useState } from "react";
import { useAxios } from "../../hooks";

interface DeadlinesContextValues {
  deadlines: Deadlines[];
  getDeadlines(): Promise<void>;
  createDeadlines(product: Deadlines): Promise<void>;
  updateDeadlines(product: Partial<Deadlines>): Promise<void>;
  deleteDeadlines(id: string): Promise<void>;
}

const DeadlinesContext = createContext<DeadlinesContextValues | null>(
  null
) as Context<DeadlinesContextValues>;

const DeadlinesProvider: FC = ({ children }) => {
  const { fetchData } = useAxios();

  const [deadlines, setDeadlines] = useState<Deadlines[]>([]);

  async function getDeadlines(): Promise<void> {
    const response = await fetchData({ url: "/deadline" });
    if (response?.data) setDeadlines(response.data);
  }

  async function createDeadlines(deadline: Deadlines): Promise<void> {
    const response = await fetchData({
      url: `/deadline`,
      method: "POST",
      body: deadline,
    });
    if (response?.data) setDeadlines([...deadlines, response.data]);
  }

  async function updateDeadlines(product: Partial<Deadlines>): Promise<void> {
    console.log("updateDeadlines", product);
  }

  async function deleteDeadlines(id: string) {
    await fetchData({ url: `/deadline/${id}`, method: "DELETE" });
    const newDeadlines = deadlines.filter(({ _id }) => _id !== id);

    setDeadlines(newDeadlines);
  }

  return (
    <DeadlinesContext.Provider
      value={{
        deadlines,
        getDeadlines,
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
