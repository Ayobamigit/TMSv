import React from 'react'
import { Route, Redirect } from 'react-router-dom';


// const storage = sessionStorage.getItem("userDetails")

// const PrivateRoute = ({component: Component, ...rest}) => {
//   return (
//       <Route {...rest} render={props => (
//           storage ?
//               <Component {...props} />
//           : <Redirect to="/sign-in" />
//       )} />
//   );
// };


const PrivateRoute = ({ component: Component, condition, ...rest }) => (
    <Route {...rest} render={(props) => (
      condition
      ? <Component {...props} />
      : <Redirect to='/dashboard' />
    )} />
)
export default PrivateRoute;
