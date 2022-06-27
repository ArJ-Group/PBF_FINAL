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

  const updateUser = (user) => {
    props.updateUser(user);
  };
  const showUpdate = (item) => {
    setShowUpdateModal(true);
    setUserUpdate({
      id: item[0],
      ...item[1],
    });
  };
  const closeUpdate = () => {
    setShowUpdateModal(false);
  };
  const onSearch = (input) => {
    if(input.target.value){
      let searchedData = Object.entries(props.user.users).filter(user=>{
        const emailFound =  user[0].match(input.target.value)
        const nameFound =  user[1].name.match(input.target.value)
        const phoneFound =  user[1].phone.match(input.target.value)
        const addressFound =  user[1].address.match(input.target.value)
        return emailFound || phoneFound || nameFound || addressFound
      })
      setUsers(searchedData)
    }else{
      setUsers(Object.entries(props.user.users))
    }
  };
  const UpdateModal = () => {
    const onUpdateFinish = (values) => {
      updateUser(values.user);
      closeUpdate();
    };
    return (
      <Modal
        title={showUpdateModal && userUpdate.id.replace("_", ".")}
        visible={showUpdateModal}
        onCancel={closeUpdate}
        footer={[]}
      >
        <Form
          labelCol={{
            span: 10,
          }}
          wrapperCol={{}}
          layout="vertical"
          onFinish={onUpdateFinish}
          initialValues={{
            user: userUpdate,
          }}
        >
          <Form.Item name={["user", "id"]} noStyle />
          <Form.Item
            name={["user", "name"]}
            label="User Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "phone"]}
            label="Phone Number"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name={["user", "address"]}
            label="Address"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }}>
            <Space>
              <Button type="ghost" onClick={closeUpdate}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    );
  };
};