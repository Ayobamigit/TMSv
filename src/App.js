import React, { lazy, Suspense } from 'react';

import './App.scss';
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom';
import PreLoader from './components/PreLoader/Preloader.component';
import SignIn from './pages/sign-in/sign-in.component';
import AdminSignIn from './pages/super-admin-login/SuperAdminSignIn.component';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
// import PrivateRoute from './privateRoute';

// Initiate Fontawesome Library
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faWallet, faKey, faCog, faFile, faBook, faUniversity, faCogs, faUsers, faHome, faSignOutAlt, faTrash, faEye, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
library.add( fab, faWallet, faKey, faCog, faFile, faBook, faUniversity, faCogs, faUsers, faHome, faSignOutAlt, faTrash, faEye, faPlusSquare )

const ProtectedRoutes = lazy(() => import('./protectedRoutes'))
// const Dashboard = lazy(() => import('./pages/dashboard/Dashboard.component'));

function App() {
  const storage = sessionStorage.getItem("userDetails")
  return (
   
    <React.Fragment>
       {/* { console.log(sessionStorage.getItem("userDetails"))}  */}
      <HashRouter>
        <ErrorBoundary>
         <Switch>
          <Suspense fallback={<PreLoader />}>
             <Route path="/" exact={true} render={() => storage ? <Redirect to={"/dashboard"} /> : <Redirect to="/sign-in" />} />
              <Route path="/sign-in" component={SignIn} /> 
              <Route path="/super-admin" component={AdminSignIn} />

              <Route path="/dashboard" component={ProtectedRoutes} />
              <Route path="/device-setup" component={ProtectedRoutes} />
              <Route exact path="/device-list" component={ProtectedRoutes} />
              <Route path="/device-list/:id" component={ProtectedRoutes} />   

              <Route path="/institution-setup" component={ProtectedRoutes} />
              <Route exact path="/institution-list" component={ProtectedRoutes} />
              <Route path="/institution-list/:id" component={ProtectedRoutes} />

              <Route path="/wallets" component={ProtectedRoutes} />
              <Route exact path="/wallet/:id" component={ProtectedRoutes} />

              <Route path="/configuration" component={ProtectedRoutes} />
              <Route exact path="/globalsetting" component={ProtectedRoutes} />
              <Route exact path="/configuration/:id" component={ProtectedRoutes} /> 
              <Route exact path="/configuration/profile/:id" component={ProtectedRoutes} />  

              <Route path="/roles" component={ProtectedRoutes} />
              <Route exact path="/roles/:id" component={ProtectedRoutes} />
              <Route exact path="/roles/permission/:id" component={ProtectedRoutes} />

              <Route path="/reporting" component={ProtectedRoutes} />
              <Route exact path="/reporting/:id" component={ProtectedRoutes} />

              <Route path="/audit" component={ProtectedRoutes} />        

              <Route path="/user-setup" component={ProtectedRoutes} />
              <Route path="/user-list" component={ProtectedRoutes} />
              <Route exact path="/user/:id" component={ProtectedRoutes} />
              
             {/* <Route path="/" render={() => storage ? <Redirect to="/dashboard" /> : <Redirect to="/sign-in" />} /> */}

              {/* <Route path ="*" component={SignIn} /> */}
        
          </Suspense>
            </Switch>
        </ErrorBoundary>
      </HashRouter>
    </React.Fragment>
  );
}

export default App;