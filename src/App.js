import React, { lazy, Suspense } from 'react';
import './App.scss';

import { Route, Switch, HashRouter } from 'react-router-dom';

import PreLoader from './components/PreLoader/Preloader.component';

import SignIn from './pages/sign-in/sign-in.component';
import AdminSignIn from './pages/super-admin-login/SuperAdminSignIn.component';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

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

              <Route exact path="/configuration" component={ProtectedRoutes} />
              <Route exact path="/configuration/:id" component={ProtectedRoutes} /> 
              <Route exact path="/configuration/profile/:id" component={ProtectedRoutes} />  

              <Route exact path="/roles" component={ProtectedRoutes} />

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