import { Form, Input, Button, Checkbox, Divider, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {authenticate} from '../Action/authAction'
import { useEffect, useState } from "react";

const Login = (props) => {
    const [loginError, setLoginError] = useState(false)
    const [loading, setLoading] = useState(false)
}  