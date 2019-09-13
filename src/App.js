import React from 'react';
import './App.css';

import { HashRouter, Route, Switch } from 'react-router-dom';

import SignIn from './pages/sign-in/sign-in.component';
import Layout from './components/Layout/layout.component';
import Dashboard from './pages/dashboard/Dashboard.component';
import DeviceSetup from './pages/terminals-management/device-setup/device-setup.component';
import DeviceLists from './pages/terminals-management/device-list/TerminalsList.component';
import DeviceList from './pages/terminals-management/device-view/device-view.component';
import InstitutionSetup from './pages/institution-management/institution-setup/institution-registration.component';
import InstitutionsList from './pages/institution-management/institutions-list/InstitutionsList.component';
import InstitutionList from './pages/institution-management/institution-view/institution-view.component';

function App() {
  return (
    <React.Fragment>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Layout>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/device-setup" component={DeviceSetup} />
            <Route exact path="/device-list" component={DeviceLists} />
            <Route exact path="/device-list/:id" component={DeviceList} />
            <Route exact path="/institution-setup" component={InstitutionSetup} />
            <Route exact path="/institution-list" component={InstitutionsList} />
            <Route exact path="/institution-list/:id" component={InstitutionList} />
          </Layout>
        </Switch>
      </HashRouter>
    </React.Fragment>
  );
}

export default App;
