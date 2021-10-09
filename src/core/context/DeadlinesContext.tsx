import React, { Context, createContext, FC, useContext, useState } from "react";
import { useAxios } from "../../hooks";
import toast from "react-hot-toast";

interface DeadlinesContextValues {
  deadlines: Deadlines[];
  getDeadlines(): Promise<void>;
  createDeadlines(deadline: Deadlines): Promise<void>;
  updateDeadlines(deadline: Partial<Deadlines>): Promise<void>;
  deleteDeadlines(id: string): Promise<void>;
}

const DeadlinesContext = createContext<DeadlinesContextValues | null>(
  null
) as Context<DeadlinesContextValues>;

function generateToaster(message: string, type: ToastHandler = "success") {
  toast[type](message);
}

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

    generateToaster("Plazo creado");
  }

  async function updateDeadlines(deadlineToUpdate: Deadlines): Promise<void> {
    const response = await fetchData({
      url: `/deadline/${deadlineToUpdate._id}`,
      method: "PUT",
      body: deadlineToUpdate,
    });

    if (response?.data) {
      const newDeadlines = deadlines.map((deadline) =>
        deadline._id === deadlineToUpdate?._id ? deadlineToUpdate : deadline
      );

      generateToaster("Plazo actualizado");
      setDeadlines(newDeadlines);
    }
  }

  async function deleteDeadlines(id: string) {
    await fetchData({ url: `/deadline/${id}`, method: "DELETE" });
    const newDeadlines = deadlines.filter(({ _id }) => _id !== id);

    setDeadlines(newDeadlines);

    generateToaster("Plazo eliminado");
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
