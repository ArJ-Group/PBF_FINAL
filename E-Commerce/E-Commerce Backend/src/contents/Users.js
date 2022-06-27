import { Button, Form, Input, Table, Space, Modal } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser, updateUser } from "../Action/UserAction";
import { EditTwoTone, SearchOutlined } from "@ant-design/icons";

const UserComponent = (props) => {
  const [users, setUsers] = useState([]);
  const [userLoading, setUserLoading] = useState(true);
  const [userUpdate, setUserUpdate] = useState({});
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  useEffect(() => {
    props.fetchUser();
  }, []);
  useEffect(() => {
    if (props.user.users !== (null || undefined)) {
      setUsers(Object.entries(props.user.users));

      setUserLoading(props.user.loading);
    }
  }, [props.user]);

};