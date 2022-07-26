import {
  Input,
  Divider,
  Table,
  Row,
  Col,
  Select,
  Button,
  Form,
  Pagination,
} from "antd";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

import { useFetch } from "../Hooks/useAxios";
import { useTableExample } from "../Hooks/useTableExample";
import { API_USER_LIST } from "../url/endpoint";

const { Search } = Input;
const { Option } = Select;

const ExamplePage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { columns, handleSearch, handlePagination, selectedHandle } =
    useTableExample();
  const { dataSource, isLoading, pages } = useFetch(API_USER_LIST);

  const onSearch = (value: String) => {
    handleSearch(value);
  };

  const handleGenderSelect = (value: string) => {
    selectedHandle(value);
  };

  const handleReset = () => {
    form.resetFields();
    navigate(`?page=1&results=10`);
  };

  const handleChangePagination = (newPage: number, pagesize?: number) => {
    handlePagination(newPage);
  };

  return (
    <>
      <Form form={form} layout="vertical">
        <Row gutter={[16, 24]}>
          <Col span={6}>
            <Form.Item label="Search" name="search">
              <Search
                placeholder="search"
                allowClear
                onSearch={onSearch}
                enterButton
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Gender" name="gender">
              <Select
                placeholder="gender"
                allowClear
                onChange={handleGenderSelect}
                style={{ width: "100%" }}
              >
                <Option value="all">All</Option>
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label=" ">
              <Button onClick={handleReset}>Reset Filter</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Divider />
      <Table
        columns={columns}
        dataSource={dataSource?.results}
        rowKey={(record: any) => record?.login?.md5}
        loading={isLoading}
        pagination={false}
        className="ajaib-mb1"
      />
      <Row justify="end">
        <Pagination
          current={pages?.page}
          defaultPageSize={pages?.results}
          onChange={handleChangePagination}
          total={20}
        />
      </Row>
    </>
  );
};

export default memo(ExamplePage);
