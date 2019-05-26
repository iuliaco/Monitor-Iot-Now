import React, { Component } from 'react';
import { Card } from 'antd';
import { Row, Col } from 'antd';
import { Avatar,Icon } from 'antd';
import { Button,Modal } from 'antd';
import Login from './Login.jsx';
import Register from './Register.jsx';


const { Meta } = Card;


class More extends Component {

    state = { 
      visiblelog: false,
    visiblereg:false
    }

    showModal1 = () => {
      this.setState({
        visiblelog: true,
      });
    }
  
    handleOk1 = (e) => {
      console.log(e);
      console.log("ajunf ")
      this.setState({
        visiblelog: false,
      });
    }
  
    handleCancel1 = (e) => {
      console.log(e);
      this.setState({
        visiblelog: false,
      });
    }
    showModal2 = () => {
      this.setState({
        visiblereg: true,
      });
    }
  
    handleOk2 = (e) => {
      console.log(e);
      this.setState({
        visiblereg: false,
      });
    }
  
    handleCancel2 = (e) => {
      console.log(e);
      this.setState({
        visiblereg: false,
      });
    }

    render() {
        return (
    <>
    <Row>
        <Col xs={{ span: 24  }}  md={{span:12}} lg={{ span: 10, offset: 1 }}><img src="/client/assets/graph3.png" style={{width:"100%"}} />    </Col> 
      <Col xs={{ span: 24  }}  md={{span:12}} lg={{ span: 10,offset:2 }}>
     <h2 style={{fontSize:"5vmin"}}>Monitorizare parametri si creare grafice</h2>
          <h4 style={{fontSize:"3vmin"}}>Posibilitatea inregistrari unor elemente volatile si a interpretari/analizari lor, cu aplicati diverse, de la masurarea schimbarilor de temperatura de-a lungul unei zile pana la compararea productiei anuale de legume, totul digital si rapid. In zilele noastre orice date importante au nevoie de monitorizare si afisare, iar noi va aducem o alternativa gratuita.

          </h4>
          </Col> 
</Row>
<Row>
<h2 style={{fontSize:"5vmin"}}>V-am convins?</h2>
</Row>
<Row>
        <Col xs={{ span: 24  }}  md={{span:12}} lg={{ span: 10, offset: 1 }}>
        <h4 style={{fontSize:"3vmin"}}>Creaza-ti un cont pe platforma:</h4> 
        <Button type="primary" onClick={this.showModal2}>Inregistrare</Button>
        <Modal
          title="Inregistrare"
          visible={this.state.visiblereg}
          onOk={this.handleOk2}
          onCancel={this.handleCancel2}>
        <Register></Register>
        </Modal>

        </Col> 
      <Col xs={{ span: 24  }}  md={{span:12}} lg={{ span: 10,offset:2 }}>
          <h4 style={{fontSize:"3vmin"}}>Sau revino in cel existent: </h4>
          <Button type="primary" onClick={this.showModal1}>Autentificare</Button>

          <Modal
          title="Autentificare"
          visible={this.state.visiblelog}
          onOk={this.handleOk1}
          onCancel={this.handleCancel1}>
        <Login></Login>
        </Modal>

          </Col> 
</Row>
</>

        );};}
export default More;
