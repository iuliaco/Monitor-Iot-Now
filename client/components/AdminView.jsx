import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Typography } from 'antd';
import { Layout } from 'antd';
import { Row, Col } from 'antd';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Tabel from './Tabel.jsx';
const { Text,Title } = Typography;


const { Header, Footer, Sider, Content } = Layout;


class AdminView extends React.Component {
constructor(props) {
    super(props);

  
  this.state= {
    tables:[]
  }
}
  componentDidMount() {
    if(!this.props.auth.isAuthenticated) {
        this.props.history.push('/about');
    }
    axios.get(`/user/tables`)
    .then(res => {
      const tables = res.data;
      this.setState({ tables });
      console.log(this.state.tables);
    })

  }

render() {
  const tables=this.state.tables;
   var tabledata=[];

    return (
   tables.length < 1 ?<div> <br/> <br/> <br/> <Title level={3}>Nu ai niciun tabel in prezent, creeaza-ti unul intrand pe "Adaugare tabel"</Title> </div> :
     tables.map((table) =>  {console.log(table); 
     tabledata= table.value1.map((x,i) => {return {value1:x, value2:table.value2[i]}});
      console.log(tabledata);
      return (
      <Col xs={{ span: 23  }}  key={table._id}  md={{span:23}} lg={{ span: 11 }} style={{margin:"2%", minHeight:"50%"}}>
      <Tabel data={table}> </Tabel>
      </Col>)
    })
    
    )

    
  }
}
const mapStateToProps = (state) => ({
  auth:state.auth
})
export default withRouter(connect(mapStateToProps)(AdminView));