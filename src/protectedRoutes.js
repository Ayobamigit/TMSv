import React, { lazy, Suspense } from 'react';
import './App.scss';

import { Route, Switch, HashRouter } from 'react-router-dom';

import PreLoader from './components/PreLoader/Preloader.component';

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard.component'));

const DeviceSetup = lazy(() => import('./pages/terminals-management/device-setup/device-setup.component'));
const DeviceLists = lazy(() => import('./pages/terminals-management/device-list/TerminalsList.component'));
const DeviceList = lazy(() => import('./pages/terminals-management/device-view/device-view.component'));

const InstitutionSetup = lazy(() => import('./pages/institution-management/institution-setup/institution-registration.component'));
const InstitutionsList = lazy(() => import('./pages/institution-management/institutions-list/InstitutionsList.component'));
const InstitutionList = lazy(() => import('./pages/institution-management/institution-view/institution-view.component'));

const ReportingComponent = lazy(() => import('./pages/reporting/Reporting.component'));
const ReportTransactionDetails = lazy(() => import('./pages/reporting/ReportTransactionDetails/ReportTransactionDetails.component'));

const AuditComponent = lazy (() => import('./pages/audit/Audit.component'));

const ConfigurationComponent = lazy (() => import('./pages/configuration/configuration-list/configuration.component'));
const ViewServiceProvider = lazy (() => import('./pages/configuration/view-service-provider/view-service-provider.component'));
const ViewProfile = lazy (() => import('./pages/configuration/view-service-provider/view-profile.component'));

const RolesAndPermissionsComponent = lazy (() => import('./pages/roles-and-permissions/roles-and-permissions.component'));
const ViewRole = lazy (() => import('./pages/roles-and-permissions/roles/view-role.component'));
const ViewAPermission = lazy(() => import('./pages/roles-and-permissions/permissions/view-a-permission.component'));

const UsersList = lazy(() => import('./pages/user-management/user-list/user-list.component'))
const User = lazy(() => import('./pages/user-management/user-view/user.component'))
const UserRegistration = lazy(() => import('./pages/user-management/user-setup/user-setup.component'))

function ProtectedRoutes() {
  return (
    <React.Fragment>
      <HashRouter>
        <ErrorBoundary>
          <Suspense fallback={<PreLoader />}>
            <Switch>  
                <Route exact path="/" component={Dashboard} /> 
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/device-setup" component={DeviceSetup} />
                <Route exact path="/device-list" component={DeviceLists} />
                <Route exact path="/device-list/:id" component={DeviceList} />
 
                <Route exact path="/institution-setup" component={InstitutionSetup} />
                <Route exact path="/institution-list" component={InstitutionsList} />
                <Route exact path="/institution-list/:id" component={InstitutionList} />

                <Route exact path="/configuration" component={ConfigurationComponent} />
                <Route exact path="/configuration/:id" component={ViewServiceProvider} /> 
                <Route exact path="/configuration/profile/:id" component={ViewProfile} />  

                <Route exact path="/reporting" component={ReportingComponent} />
                <Route exact path="/reporting/:id" component={ReportTransactionDetails} />

                <Route exact path="/roles" component={RolesAndPermissionsComponent} />
                <Route exact path="/roles/:id" component={ViewRole} />
                <Route exact path="/roles/permission/:id" component={ViewAPermission} />


                <Route exact path="/audit" component={AuditComponent} />        

                <Route exact path="/user-setup" component={UserRegistration} />
                <Route exact path="/user-list" component={UsersList} />
                <Route exact path="/user/:id" component={User} />

                <Route path="*" component={Dashboard} />      
            </Switch>
          </Suspense>
        </ErrorBoundary>
      </HashRouter>
    </React.Fragment>
  );
}

export default ProtectedRoutes;