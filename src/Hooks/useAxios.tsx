import axios from "axios";
import { parse } from "query-string";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

export const fecther = async (url: string, headers?: object) => {
  let header: object = {
    ...headers,
    url,
    headers: {
      "Content-Type": "application/json",
    },
  };
  const { data } = await axios.request(header);
  return data;
};

export const useFetch = (url: string, params?: any) => {
  const { search } = useLocation();
  const parsed = useMemo(() => parse(search), [search]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [dataSource, setDataSource] = useState<any>(null);
  const [pages, setPages] = useState<any>(null);

  const fetching = async () => {
    setIsLoading(true);
    try {
      const data = await fecther(url, { method: "GET", params: { ...parsed } });
      setDataSource(data);
      setPages(data?.info);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (search) {
      fetching();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return { dataSource, isLoading, error, pages };
};
