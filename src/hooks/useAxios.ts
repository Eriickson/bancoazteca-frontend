import { useState } from "react";
import axios, { Method } from "axios";

axios.defaults.baseURL = "http://localhost:9000";

interface UseAxiosOptions {
  url: string;
  method?: Method;
  body?: Record<string, any>;
  headers?: Record<string, string>;
}

export const useAxios = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  async function fetchData({
    url,
    method = "GET",
    body,
    headers = {},
  }: UseAxiosOptions) {
    try {
      setIsLoading(true);
      const response = await axios({ url, method, data: body, headers });
      setIsLoading(false);
      setData(response.data);
      return response;
    } catch (err: any) {
      setIsLoading(false);
      setError(err);
    }
  }

  return { fetchData, isLoading, data, error };
};
