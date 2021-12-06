import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { getIsLoggedIn } from 'redux/auth/auth-selectors';

export default function PrivateRoute({ children, redirectTo = '/', ...props }) {
    const isLoggedIn = useSelector(getIsLoggedIn);

    return (
        <Route {...props}>
            {isLoggedIn ? children : <Redirect to={redirectTo} />}
        </Route>
    );
}
