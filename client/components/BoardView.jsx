import React from 'react';
import ReactDOM from 'react-dom';
import { Button,Typography  } from 'antd';
import { Layout } from 'antd';
import { Row, Col } from 'antd';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Collapse, Icon } from 'antd';
const { Text,Title } = Typography;

const Panel = Collapse.Panel;

const { Header, Footer, Sider, Content } = Layout;


class BoardView extends React.Component {
constructor(props) {
    super(props);

  
  this.state= {
    security_code:'',
    visible:false
  }
}
  componentDidMount() {
    if(!this.props.auth.isAuthenticated) {
        this.props.history.push('/about');
    }
    axios.get(`/user/seccode`)
    .then(res => {
      const security_code = res.data.security_code;
      this.setState({ security_code });
      console.log(this.state.security_code);
    })

  }
  sshow = () => {
    if(this.state.visible==false){
  this.setState({ visible: true });
  
    }
    else{
      this.setState({ visible: false });
  
  
    }
  }

render() {

  const text = `
  Un punct se pune pe grafic in timp real si orice placuta care are wi-fi integrat este suportata.
`;
const text1 = `
O cerere PUT este o cerere de tip http care se poate face pe placutele care au acces la internet. Pentru mai multe detalii verifica documentatia pusa la dispozitie de firma placutei tale.

`;
const text2 = `
Codul de securitate este codul personal care atesta ca tu esti cel care adauga puncte pe grafic, astfel nimeni altcineva nu iti poate accesa graficul. Acest cod exista din scopuri de securitate dupa cum atesta si numele.
`;
  return (
    <div>
    <Row>
      <Col xs={24} sm={24} md={24} lg={{ span: 20, offset: 2 }} xl={{ span: 16, offset: 4 }}>
    <Collapse  >
    <Panel header="Cat de repede se pune un punct pe grafic si ce placute sunt suportate?" key="1" >
      <div>{text}</div>
    </Panel>
    <Panel header="Ce reprezinta o cerere PUT?" key="2" >
      <div>{text1}</div>
    </Panel>
    <Panel header="Ce reprezinta codul de securitate si unde il pot gasi?" key="3" >
      <div>{text2}</div>
    </Panel>
  </Collapse>
 </Col>
 </Row>
     <Row>
       <br/> <br/>
<Title level={4}>Afla-ti codul de securitate!</Title>
<br/>
<Button type="primary" onClick={this.sshow}>
          Generare
        </Button > 
        <br/>        <br/>
        <Text code className={this.state.visible?'visible':'notvisible'}>Codul tau este: {this.state.security_code}</Text>
 
</Row>
</div>
  )   



  }
}
const mapStateToProps = (state) => ({
  auth:state.auth
})
export default withRouter(connect(mapStateToProps)(BoardView));