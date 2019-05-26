import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './components/App.js';
import  LoginView  from './components/LoginView.jsx';
import  RegisterView  from './components/RegisterView.jsx';
import  AdminView  from './components/AdminView.jsx';
import  ComponentView  from './components/ComponentView.jsx';
import  PutView  from './components/PutView.jsx';
import  OneTable  from './components/OneTable.jsx';
import  Intro  from './components/Intro.jsx';
import  BoardView  from './components/BoardView.jsx';
import  ProfileView  from './components/ProfileView.jsx';


export const Routes = () => (
    <Switch>
      <Route exact path='/put' component={PutView} />
      <Route exact path='/adaugare' component={ComponentView} />
      <Route exact path='/about' component={Intro} />
      <Route exact path='/' component={AdminView} />
      <Route exact path='/login' component={LoginView} />
      <Route exact path='/register' component={RegisterView} />
      <Route exact path='/placuta' component={BoardView} />
      <Route exact path='/profile' component={ProfileView} />
      <Route path="/:id" component={OneTable} />
      
    </Switch>
);
export default Routes;
