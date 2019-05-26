import React, { Component } from 'react';

import { Menu, Icon, Avatar,Drawer } from 'antd';
import { withRouter} from 'react-router-dom';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

 class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMobile:false,
      visible:false
    }
    this.showDrawer = this.showDrawer.bind(this);
    this.onClose = this.onClose.bind(this);
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
   <Avatar shape="square" size={64} src={'/client/assets/logo2.png'} />
   </Menu.Item>
 
    
    <Menu.Item key="mail"  className="logo">
    Despre
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
   <Avatar shape="square" size={64} src={'/client/assets/logo2.png'} />
   </Menu.Item>

</Menu>
<div>
  <Drawer
  title="IOT Monitor"
  placement="right"
  closable={false}
  onClose={this.onClose}
  visible={this.state.visible}
>
<Menu
mode="inline"
>
<Menu.Item key="mail"  className="logo">
    Despre
    </Menu.Item>
    

</Menu>

</Drawer>
</div></div>
}
      
      </div>
    )}
}

export default  withRouter(Navbar); 