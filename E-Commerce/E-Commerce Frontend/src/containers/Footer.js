import React, {Component} from 'react'
import { Layout } from 'antd'
import './style.css'

const {Footer} = Layout;

class Foot extends Component {
    
  render() {
    return (
        <Footer style={{ textAlign: 'center' }}>
          <hr style={{maxWidth:700}}/>
          All rights reserved 2022
        </Footer>
    );
  }
}
export default Foot


