import React, { lazy, Suspense } from 'react';
import './App.scss';

import { Route, Switch, BrowserRouter } from 'react-router-dom';

import PreLoader from './components/PreLoader/Preloader.component';

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { hasPermission, CREATE_TERMINALS, VIEW_ROLES, CREATE_INSTITUTION, VIEW_INSTITUTION_INSTITUTION, GLOBAL_SETTINGS, CREATE_PROVIDERS, CREATE_ROLES, VIEW_WALLET, CREATE_USER, CREATE_WALLET } from './Utils/getPermission';
import PrivateRoute from './privateRoute';
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
const GlobalSetting = lazy (() => import('./pages/configuration/global-setting/global-setting.component'));
const ViewServiceProvider = lazy (() => import('./pages/configuration/view-service-provider/view-service-provider.component'));
const ViewProfile = lazy (() => import('./pages/configuration/view-service-provider/view-profile.component'));

const RolesAndPermissionsComponent = lazy (() => import('./pages/roles-and-permissions/roles-and-permissions.component'));
const ViewRole = lazy (() => import('./pages/roles-and-permissions/roles/view-role.component'));
const ViewAPermission = lazy(() => import('./pages/roles-and-permissions/permissions/view-a-permission.component'));

const UsersList = lazy(() => import('./pages/user-management/user-list/user-list.component'))
const User = lazy(() => import('./pages/user-management/user-view/user.component'))
const UserRegistration = lazy(() => import('./pages/user-management/user-setup/user-setup.component'))

const WalletsList = lazy(() => import('./pages/wallet/view-all-wallets/view-all-wallets.component'))
const WalletView = lazy(() => import('./pages/wallet/view-wallet/view-wallet.component'))

function ProtectedRoutes() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <ErrorBoundary>
            <Switch> 
          <Suspense fallback={<PreLoader />}>
              <Route exact path="/dashboard" component={Dashboard} />

              <PrivateRoute exact path='/roles/:id' condition={hasPermission(CREATE_ROLES)} component={ViewRole} />
              <PrivateRoute exact path='/roles' condition={hasPermission(VIEW_ROLES)} component={RolesAndPermissionsComponent} />
              <PrivateRoute path='/roles/permission/:id' condition={hasPermission(CREATE_ROLES)} component={ViewAPermission} />

              {/* Route is only active for users that have permission create_user  */}
              <PrivateRoute exact path='/user-setup' condition={hasPermission(CREATE_USER)} component={UserRegistration} />                
              <Route exact path="/user-list" component={UsersList} />
              <Route exact path="/user/:id" component={User} />
            
              {/* Route is only active for users that have permission add_terminals  */}
              <PrivateRoute exact path='/device-setup' condition={hasPermission(CREATE_TERMINALS)} component={DeviceSetup} />                
              <Route exact path="/device-list" component={DeviceLists} />
              <Route exact path="/device-list/:id" component={DeviceList} />

              {/* Route is only active for users that have permission create_institution  */}                
              <PrivateRoute exact path='/institution-setup' condition={hasPermission(CREATE_INSTITUTION)} component={InstitutionSetup} />                
              <PrivateRoute exact path='/institution-list' condition={hasPermission(CREATE_INSTITUTION)} component={InstitutionsList} />                
              <PrivateRoute exact path='/institution-list/:id' condition={hasPermission(CREATE_INSTITUTION) || (VIEW_INSTITUTION_INSTITUTION)} component={InstitutionList} />                

              <PrivateRoute exact path="/wallets" condition={hasPermission(CREATE_WALLET) || (VIEW_WALLET)} component={WalletsList} />
              <PrivateRoute exact path="/wallet/:id" condition={hasPermission(CREATE_WALLET)} component={WalletView} />

              {/* Route is only active for users that have permission global_settings  */}
              <PrivateRoute exact path='/globalsetting' condition={hasPermission(GLOBAL_SETTINGS)} component={GlobalSetting} />             
              <Route exact path="/configuration/:id" condition={hasPermission(CREATE_PROVIDERS)} component={ViewServiceProvider} /> 
              <Route exact path="/configuration/profile/:id" component={ViewProfile} />  
              <Route exact path="/configuration" component={ConfigurationComponent} />
              

              <Route exact path="/reporting" component={ReportingComponent} />
              <Route exact path="/reporting/:id" component={ReportTransactionDetails} />

              <Route exact path="/audit" component={AuditComponent} />        
              <Route exact path="/" component={Dashboard} /> 

              {/* <Route path="*" component={Dashboard} />       */}
          </Suspense>
            </Switch>
        </ErrorBoundary>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default ProtectedRoutes;