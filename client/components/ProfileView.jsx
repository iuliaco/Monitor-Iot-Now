import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Card  } from 'antd';
import { Layout } from 'antd';
import { Row, Col } from 'antd';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Typography } from 'antd';
import moment from 'moment'


const { Title } = Typography;

const { Header, Footer, Sider, Content } = Layout;


class ProfileView extends React.Component {
constructor(props) {
    super(props);

  
  this.state= {
    user:[]
  }
}
 
  componentDidMount() {
    if(!this.props.auth.isAuthenticated) {
        this.props.history.push('/about');
    }
    axios.get(`/user/fullprofile`)
    .then(res => {
      const user = res.data;
      this.setState({ user });
      console.log(this.state.user);
    })

  }

render() {
  const birth= this.state.user.birthdate;
  const registerdate= this.state.user.registerdata;

  console.log(birth,registerdate);
  
    const gender=this.state.gender;
    console.log(gender);

    return (
        <div>
<Card title="Profil" bordered={false} >
    <Title level={4} style={{ fontSize: '14px' }}>Numele de utilizator: {this.state.user.username}</Title> <br/>
    <Title level={4} style={{ fontSize: '14px' }}>Email: {this.state.user.email}</Title> <br/>
    <Title level={4} style={{ fontSize: '14px' }}> Nume: {this.state.user.name}</Title> <br/>
    <Title level={4} style={{ fontSize: '14px' }}>Prenume: {this.state.user.surname}</Title > <br/>
    <Title level={4} style={{ fontSize: '14px' }}>Data nasterii: {moment(birth).format("MMM Do YYYY")}</Title > <br/>
    <Title level={4} style={{ fontSize: '14px' }}>Gen: {gender ?'masculin': 'feminin'}</Title > <br/>
    <Title level={4} style={{ fontSize: '14px' }}>Data inregistrari: {moment(registerdate).format("MMM Do YYYY")}</Title > <br/>
</Card>

 </div>
 )

    
  }
}
const mapStateToProps = (state) => ({
  auth:state.auth
})
export default withRouter(connect(mapStateToProps)(ProfileView));
