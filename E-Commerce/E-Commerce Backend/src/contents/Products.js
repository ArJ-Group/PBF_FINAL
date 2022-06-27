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
  
}