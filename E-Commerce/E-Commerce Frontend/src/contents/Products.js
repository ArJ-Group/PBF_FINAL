import React, {Component} from 'react'
import FirebaseApp from '../firebase/app'
import { Layout, Breadcrumb, Card, Image, Button, List, Modal, Skeleton, Alert, Menu, Dropdown} from 'antd'
import {
    StarOutlined,
    DownOutlined
} from '@ant-design/icons'
import {addCart, updateCart, showCart} from '../Actions/cartAction'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Search from 'antd/lib/input/Search'
import EmptySVG from '../Assets/empty.svg'
import { Link } from 'react-router-dom'

const {Content} = Layout;


class Cont extends Component {
    state = {
        products:[],
        loading:true,
        descRendered: false,
        visible: false,
        modalItem:[],
        productFilter: [],
        isCartAvailable: false,
        isAddCartSuccess: false,
        addCartSuccessMsg: '',
        cartAvailableMsg:'',
        isModalLoginVisible: false
    }
    hideModal = () => {
        this.setState({visible:false})
    }
    showModal = (item) => {
        this.setState({
            visible:true,
            modalItem:item
        }) 
    }
    takeProducts = () => {
        FirebaseApp.database().ref('products')
            .on('value',snapshot=>{
                const products = snapshot.val()
                const productscopy = snapshot.val()
                if(products.length>0){
                    this.setState({
                        products: products,
                        productFilter: productscopy
                    })
                }
                this.setState({loading: false})
            }, err=>{
                this.setState({loading:false})
            })
    }
    componentDidMount(){
        this.takeProducts()
        if(this.props.auth.auth){
            this.props.showCart()
        }
    }
};