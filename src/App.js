import React, { lazy, Suspense } from 'react';

import './App.scss';
import { Route, Switch, HashRouter } from 'react-router-dom';
import PreLoader from './components/PreLoader/Preloader.component';
import SignIn from './pages/sign-in/sign-in.component';
import AdminSignIn from './pages/super-admin-login/SuperAdminSignIn.component';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

// Initiate Fontawesome Library
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faWallet, faKey, faCog, faFile, faBook, faUniversity, faCogs, faUsers, faHome, faSignOutAlt, faTrash, faEye, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
library.add( fab, faWallet, faKey, faCog, faFile, faBook, faUniversity, faCogs, faUsers, faHome, faSignOutAlt, faTrash, faEye, faPlusSquare )

const ProtectedRoutes = lazy(() => import('./protectedRoutes'))

function App() {
  return (
    <React.Fragment>
      <HashRouter>
        <ErrorBoundary>
          <Suspense fallback={<PreLoader />}>
            <Switch>  
              <Route exact path="/" component={SignIn} /> 
              <Route exact path="/super-admin" component={AdminSignIn} />
              <Route exact path="/dashboard" component={ProtectedRoutes} />
              <Route exact path="/device-setup" component={ProtectedRoutes} />
              <Route exact path="/device-list" component={ProtectedRoutes} />
              <Route exact path="/device-list/:id" component={ProtectedRoutes} />   

              <Route exact path="/institution-setup" component={ProtectedRoutes} />
              <Route exact path="/institution-list" component={ProtectedRoutes} />
              <Route exact path="/institution-list/:id" component={ProtectedRoutes} />

              <Route exact path="/wallets" component={ProtectedRoutes} />
              <Route exact path="/wallet/:id" component={ProtectedRoutes} />

              <Route exact path="/configuration" component={ProtectedRoutes} />
              <Route exact path="/configuration/globalsetting" component={ProtectedRoutes} />
              <Route exact path="/configuration/:id" component={ProtectedRoutes} /> 
              <Route exact path="/configuration/profile/:id" component={ProtectedRoutes} />  

              <Route exact path="/roles" component={ProtectedRoutes} />
              <Route exact path="/roles/:id" component={ProtectedRoutes} />
              <Route exact path="/roles/permission/:id" component={ProtectedRoutes} />

              <Route exact path="/reporting" component={ProtectedRoutes} />
              <Route exact path="/reporting/:id" component={ProtectedRoutes} />

              <Route exact path="/audit" component={ProtectedRoutes} />        

              <Route exact path="/user-setup" component={ProtectedRoutes} />
              <Route exact path="/user-list" component={ProtectedRoutes} />
              <Route exact path="/user/:id" component={ProtectedRoutes} />

              <Route path="*" component={SignIn} />      
            </Switch>
          </Suspense>
        </ErrorBoundary>
      </HashRouter>
    </React.Fragment>
  );
}

export default App;