import React, { Component } from 'react';
import { Row, Col, Modal, Button } from 'antd';
import {TweenComponent, TimelineComponent} from './Animations.jsx';
import Services from './Services.jsx';
import More from './More.jsx';

class Intro extends Component {
    render() {
      return (
        <>
        <div className="about" style={{ height:'92%', display:'inline-flex',justifyContent: 'center',alignItems: 'center'  }} >
      <Row>
    <Col xs={{ span: 24  }} lg={{ span: 22, offset: 2 }}>{/* <h1>TEST TESTY</h1> */}
    {/* <TweenComponent/> */}
    <TimelineComponent/>
    </Col>
   {/*  <Col xs={{ span: 24  }} lg={{ span: 8, offset: 2 }}><img src="/client/assets/graph.gif" style={{width:"100%"}} />    </Col>  */}
      </Row>
      </div>
      <div className="services" style={{ minHeight:'100%'  }} >

        <Services></Services>
      
      </div>
      <div></div>
      <div className="more" style={{ minHeight:'100%'  }} >
        <More></More>

        
        </div>
      </>
      );
    }
  }
  
  export default Intro;
  