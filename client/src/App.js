import React from 'react';
import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SignIn from './pages/sign-in/sign-in.component';
import Layout from './components/Layout/layout.component';
import Dashboard from './pages/dashboard/Dashboard.component';
import DeviceSetup from './pages/device-setup/device-setup.component';
import InstitutionManagement from './pages/institution-registration/institution-registration.component';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Layout>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/device-setup" component={DeviceSetup} />
            <Route exact path="/institution-management" component={InstitutionManagement} />
          </Layout>
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
