import React, { lazy, Suspense } from 'react';
import './App.css';

import { Route, Switch, HashRouter } from 'react-router-dom';

import PreLoader from './components/PreLoader/Preloader.component';

import SignIn from './pages/sign-in/sign-in.component';
import AdminSignIn from './pages/super-admin-login/SuperAdminSignIn.component';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard.component'));
const DeviceSetup = lazy(() => import('./pages/terminals-management/device-setup/device-setup.component'));
const DeviceLists = lazy(() => import('./pages/terminals-management/device-list/TerminalsList.component'));
const DeviceList = lazy(() => import('./pages/terminals-management/device-view/device-view.component'));
const InstitutionSetup = lazy(() => import('./pages/institution-management/institution-setup/institution-registration.component'));
const InstitutionsList = lazy(() => import('./pages/institution-management/institutions-list/InstitutionsList.component'));
const InstitutionList = lazy(() => import('./pages/institution-management/institution-view/institution-view.component'));
const ReportingComponent = lazy(() => import('./pages/reporting/Reporting.component'));
const AuditComponent = lazy (() => import('./pages/audit/Audit.component'));
const UserManagementComponent = lazy(() => import('./pages/user-management/UserManagement.component'));

function App() {
  return (
    <React.Fragment>
      <HashRouter>
        <ErrorBoundary>
          <Suspense fallback={<PreLoader />}>
            <Switch>  
              <Route exact path="/" component={SignIn} /> 
              <Route exact path="/super-admin" component={AdminSignIn} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/device-setup" component={DeviceSetup} />
              <Route exact path="/device-list" component={DeviceLists} />
              <Route exact path="/device-list/:id" component={DeviceList} />
              <Route exact path="/institution-setup" component={InstitutionSetup} />
              <Route exact path="/institution-list" component={InstitutionsList} />
              <Route exact path="/institution-list/:id" component={InstitutionList} />

              <Route exact path="/reporting" component={ReportingComponent} />
              <Route exact path="/audit" component={AuditComponent} />
              <Route exact path="/user-management" component={UserManagementComponent} />
              <Route path="*" component={SignIn} />      
            </Switch>
          </Suspense>
        </ErrorBoundary>
      </HashRouter>
    </React.Fragment>
  );
}

export default App;