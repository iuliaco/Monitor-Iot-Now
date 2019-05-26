import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Icon, Avatar,Drawer } from 'antd';
import {logoutUser} from './../actions/authentication';
import { withRouter} from 'react-router-dom';
import { NavLink } from 'react-router-dom';


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class AuthNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMobile:false,
      visible:false
    }
    this.showDrawer = this.showDrawer.bind(this);
    this.onClose = this.onClose.bind(this);
    this.logOut = this.logOut.bind(this);

  }
  logOut(e) {
    e.preventDefault();

    console.log("ajunge aici");
    this.props.logoutUser(this.props.history);
  }
    showDrawer() {
      this.setState({
        visible: true,
      });
    };
  
    onClose() {
      this.setState({
        visible: false,
      });
    };
    componentDidMount() {
      if(window.matchMedia('(max-width: 600px)').matches)
      this.setState({
        isMobile: true
      });
      window.addEventListener("resize", ()=>{
        console.log("merge");
        if(this.state.isMobile){
        if(window.matchMedia('(min-width: 600px)').matches)
        this.setState({
          isMobile: false
        });
        }
      else{
        if(window.matchMedia('(max-width: 600px)').matches)
        this.setState({
          isMobile: true
        });
      }
      }
        );
      
      
    }
 
  render() {
    const mediaQuery = window.matchMedia('(min-width: 600px)');

    return (
      <div>
     {  !this.state.isMobile ?
  <Menu
    mode="horizontal" id="menu"
  >
   <Menu.Item key="avatar" className="logo">
   <NavLink to="/"> 
   <Avatar shape="square" size={64} src={'/client/assets/logo2.png'} />
   </NavLink>
   </Menu.Item>

    <Menu.Item key="mail"  className="logo"> <NavLink to="/">
    Vizualizare tabele </NavLink>
    </Menu.Item>
    <Menu.Item key="numail"  className="logo">  <NavLink to="/profile">
    Profil  </NavLink>
  </Menu.Item> 
    <Menu.Item key="information"  className="logo">  <NavLink to="/placuta">
    Instructiuni  </NavLink>
  </Menu.Item>
  
  <Menu.Item key="add"  className="logo"> <NavLink to="/adaugare"> 
        Adaugare tabel
    </NavLink>
  </Menu.Item>
  <Menu.Item key="nnn"  className="logo" onClick={this.logOut}>
<a href="#" style={{cursor:'pointer'}} onClick={this.logOut}>
      Delogare
      </a>
</Menu.Item>
</Menu>
:
<div>
<Menu
mode="horizontal" id="menu" style={{ flexDirection:"row-reverse"}}
>
<Menu.Item key="menu" className="logo" style={{display:"flex", flex:"1", flexDirection:"row-reverse", padding:"0"}}>

   <Icon type="bars"  style={{ fontSize: '40px'}} onClick={this.showDrawer}/>
   </Menu.Item>
<Menu.Item key="avatar" className="logo" style={{ flex:"1"}}>
<NavLink to="/">
   <Avatar shape="square" size={64} src={'/client/assets/logo2.png'} />
   </NavLink>

   </Menu.Item>

</Menu>
<div>
  <Drawer
  title="IOT Monitor"
  
  closable={false}
  onClose={this.onClose}
  visible={this.state.visible}
>
<Menu
mode="inline"


>

<Menu.Item key="mail"  className="logo">  <NavLink to="/profile">
    Profil </NavLink>
    </Menu.Item>
    <Menu.Item key="numail"  className="logo"> <NavLink to="/"> 
    Vizualizare tabele
    </NavLink>
  </Menu.Item>
  <Menu.Item key="nuinformationmail"  className="logo"> <NavLink to="/placuta"> 
      Instructiuni
    </NavLink>
  </Menu.Item>
  <Menu.Item key="add"  className="logo"> <NavLink to="/adaugare"> 
        Adaugare tabel
    </NavLink>
  </Menu.Item>
  <Menu.Item key="nnn"  className="logo" >
 <a href="#" onClick={this.logOut} style={{cursor:'pointer'}}>
      Delogare
      </a>
</Menu.Item>

</Menu>

</Drawer>
</div></div>
}
      
      </div>
    )}
}
const mapStateToProps = (state) => ({
  auth:state.auth,
  errors: state.errors
})

export default  withRouter(connect(mapStateToProps, { logoutUser })(AuthNavbar))