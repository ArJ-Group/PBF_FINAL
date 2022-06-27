import React, {Component} from 'react'
import { Layout, Breadcrumb, Card, Image,Button, Row, Col, Modal, Skeleton} from 'antd'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import {
  LoadingOutlined,
  SyncOutlined,
  PlusOutlined,
  MinusOutlined,
  DeleteTwoTone
} from '@ant-design/icons'
import {showCart, deleteCart, updateCart} from '../Actions/cartAction'
import EmptyCartSVG from '../Assets/empty_cart.svg'
import LoginCartSVG from '../Assets/login_cart.svg'
import { Link } from 'react-router-dom';

const {Content} = Layout;

class Cont extends Component {
  state = {
    isModalVisible: true
  }


  componentDidMount(){
    if(this.props.auth){
      this.props.showCart()
    }
  }
  increaseAmount (id){
    let {cart} = this.props
    cart.forEach(item=>{
      if(item.id === id){
        if(item.amount !== item.stock){
          item.amount = ++item.amount
          this.props.updateCart(item)
        }
      }
    })
  }
  
  decreaseAmount(id){
    let {cart} = this.props
    cart.forEach(item=>{
      if(item.id === id && item.amount>1){
          item.amount = --item.amount
          this.props.updateCart(item)
      }
    })
  }

};