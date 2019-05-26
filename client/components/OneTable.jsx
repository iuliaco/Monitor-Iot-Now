
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import { Layout } from 'antd';
import { Row, Col } from 'antd';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Tabel from './Tabel.jsx'


const { Header, Footer, Sider, Content } = Layout;


class OneTable extends React.Component {
constructor(props) {
    super(props);

  
  this.state= {
    table:{}
  }
}
  componentDidMount() {
    if(!this.props.auth.isAuthenticated) {
        this.props.history.push('/about');
    }
    axios.get(`/user/tables/${this.props.match.params.id}`)
    .then(res => {
      const table = res.data;
      console.log(table);
      this.setState({ table });
      console.log(this.state.table);
    })

  }

render() {
  const table=this.state.table;
   var tabledata=[];
    console.log(this.state);
    return (
        Object.keys(table).length == 0 ? <h1>Nu exista tabelul</h1> :
      <Tabel key={table._id} data={table}> </Tabel>
    
    
    )

    
  }
}
const mapStateToProps = (state) => ({
  auth:state.auth
})
export default withRouter(connect(mapStateToProps)(OneTable));