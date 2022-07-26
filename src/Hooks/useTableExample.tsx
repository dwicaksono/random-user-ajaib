import { Typography } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { parse, stringify } from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { FORMAT_DATE } from "../constants";
import sorter from "../utils/sorter";

const { Text } = Typography;

const columnsRandom = [
  {
    title: "Usename",
    dataIndex: "username",
    key: "username",
    render: (_: any, record: any) => <Text>{record?.login?.username}</Text>,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (_: any, record: any) => <Text>{record?.name?.first}</Text>,
    sorter: (a: any, b: any) => sorter(a.name.first, b.name.first),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    sorter: (a: any, b: any) => sorter(a.email, b.email),
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    sorter: (a: any, b: any) => sorter(a.gender, b.gender),
  },
  {
    title: "Registared Date",
    dataIndex: "registered",
    key: "registered",
    render: (_: any, record: any) => (
      <Text>
        {dayjs(record?.registered?.date).format(
          `${FORMAT_DATE.DDMMYYYY} ${FORMAT_DATE.HOURS}`
        )}
      </Text>
    ),
    sorter: (a: any, b: any) => sorter(a.registered.date, b.registered.date),
  },
];

export const useTableExample = () => {
  const [columns] = useState<any[]>(columnsRandom);
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const parsedQuery = useMemo(() => parse(search), [search]);

  useEffect(() => {
    if (!search) {
      navigate(`${pathname}?page=1&results=10`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = useCallback(
    (value: any) => {
      const newQuery = { ...parsedQuery, name: value };
      navigate(`?${stringify(newQuery)}`);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [parsedQuery]
  );

  const selectedHandle = useCallback(
    (value: any) => {
      const newQuery = { ...parsedQuery, gender: value };
      navigate(`?${stringify(newQuery)}`);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [parsedQuery]
  );

  const handlePagination = (newPage: any) => {
    const queryPagination = {
      ...parsedQuery,
      page: newPage,
      results: 10,
    };
    navigate(`?${stringify(queryPagination)}`);
  };

  return { columns, handleSearch, handlePagination, selectedHandle };
};
