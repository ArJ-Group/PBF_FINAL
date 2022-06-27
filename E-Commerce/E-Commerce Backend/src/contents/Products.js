import {
    Form,
    Input,
    Button,
    Table,
    Space,
    Image,
    Row,
    Col,
    Popconfirm,
    Modal,
    Divider,
    Alert,
    Tooltip,
  } from "antd";
  import Title from "antd/lib/typography/Title";
  import { useState, useEffect } from "react";
  import { connect } from "react-redux";
  import { bindActionCreators } from "redux";
  import {
    fetchProduct,
    addProduct,
    deleteProduct,
    updateProduct,
  } from "../Action/productAction";
  import {
    DeleteTwoTone,
    EditTwoTone,
    SearchOutlined,
    ArrowRightOutlined,
    ArrowLeftOutlined,
  } from "@ant-design/icons";
  
  const ProductComponent = (props) => {
    const [data, setData] = useState([]);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [productUpdate, setProductUpdate] = useState({});
    const [dataloading, setDataloading] = useState(true);
  
    useEffect(() => {
      props.fetchProduct();
    }, []);
  
    useEffect(() => {
      if (props.product !== null) {
        setData(props.product.products);
        setDataloading(props.product.loading);
      }
    }, [props.product]);
  
    const onAddFinish = (values) => {
      let body = {
        ...values.product,
        rate: parseInt(values.product.rate),
        price: parseInt(values.product.price),
        stock: parseInt(values.product.stock),
        id: "PROD" + new Date().getTime().toString(),
      };
      props.addProduct(body);
    };
    const AddProductForm = () => {
      return (
        <Form
          labelCol={{
            span: 10,
          }}
          wrapperCol={{}}
          layout="vertical"
          initialValues={{}}
          onFinish={onAddFinish}
        >
          <Form.Item
            name={["product", "name"]}
            label="Product Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["product", "img"]}
            label="Image Link"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["product", "desc"]}
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name={["product", "price"]}
            label="Price"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name={["product", "rate"]}
            label="Rating"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name={["product", "stock"]}
            label="Stock"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }}>
            <Button type="primary" htmlType="submit" loading={dataloading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      );
    };
  
    const deleteProduct = (id) => {
      props.deleteProduct(id);
    };
    const [onSearchError, setOnSearchError] = useState(false);
    const onSearch = (text) => {
      if (text.target.value) {
        let searchedData = props.product.products.filter((item) => {
          return item.name.toLowerCase().match(text.target.value.toLowerCase());
        });
        if (searchedData.length > 0) {
          setData(searchedData);
          setOnSearchError(false);
        } else {
          setData(props.product.products);
          setOnSearchError(true);
        }
      } else {
        setData(props.product.products);
      }
    };
    const ProductTable = () => {
      const fontSize = (size) => {
        return {
          fontSize: size,
        };
      };
      const columns = [
        {
          title: "Image",
          dataIndex: "img",
          key: "img",
          render: (link) => <Image width={100} src={link} />,
        },
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Price",
          dataIndex: "price",
          key: "price",
          sorter: (a, b) => a.price - b.price,
        },
        {
          title: "Description",
          dataIndex: "desc",
          key: "desc",
          render: (text) => text.substring(0, 1000)+'.',
        },
        {
          title: "Rating",
          dataIndex: "rate",
          key: "rate",
        },
        {
          title: "Stock",
          dataIndex: "stock",
          key: "stock",
        },
        {
          title: "Action",
          dataIndex: "id",
          key: "action",
          render: (id, item) => {
            return (
              <div>
                <Space direction="horizontal">
                  <Popconfirm
                    title="Sure to Delete?"
                    onConfirm={() => deleteProduct(id)}
                  >
                    <a>
                      <DeleteTwoTone
                        twoToneColor="red"
                        width={100}
                        style={fontSize(16)}
                      />
                    </a>
                  </Popconfirm>
                  <a onClick={() => showUpdate(item)}>
                    <EditTwoTone style={fontSize(16)} />
                  </a>
                </Space>
              </div>
            );
          },
        },
      ];
      return (
        <Table
          size="small"
          loading={dataloading}
          columns={columns}
          dataSource={data}
          style={{alignSelf: 'stretch'}}
        />
      );
    };
};