import { Suspense, lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppBar from '../AppBar';
import { fetchCurrentUser } from 'redux/auth/auth-operation';
import Container from '../Container';
import PrivateRoute from 'routes/PrivateRoute';
import PublicRoute from 'routes/PublicRoute';
import { getFetchingCurrentUser } from 'redux/auth/auth-selectors';

const HomeView = lazy(() =>
    import('views/HomeView' /* webpackChunkName: "home-page" */),
);
const LoginView = lazy(() =>
    import('views/LoginView' /* webpackChunkName: "login-page" */),
);
const RegisterView = lazy(() =>
    import('views/RegisterView' /* webpackChunkName: "register-page" */),
);
const ContactsView = lazy(() =>
    import('views/ContactsView' /* webpackChunkName: "contacts-page" */),
);

export default function App() {
    const dispatch = useDispatch();
    const isFetchingCurrentUser = useSelector(getFetchingCurrentUser);

    useEffect(() => {
        dispatch(fetchCurrentUser());
    }, [dispatch]);

    return (
        <>
            {isFetchingCurrentUser ? (
                <Loader
                    className="Spinner"
                    type="Circles"
                    color="#1b39e2"
                    height={300}
                    width={300}
                />
            ) : (
                <>
                    <AppBar />
                    <ToastContainer />
                    <Container>
                        <Suspense
                            fallback={
                                <Loader
                                    className="Spinner"
                                    type="Circles"
                                    color="#1b39e2"
                                    height={300}
                                    width={300}
                                />
                            }
                        >
                            <Switch>
                                <PublicRoute exact path="/">
                                    <HomeView />
                                </PublicRoute>

                                <PublicRoute
                                    exact
                                    path="/register"
                                    redirectTo="/contacts"
                                    restricted
                                >
                                    <RegisterView />
                                </PublicRoute>

                                <PublicRoute
                                    exact
                                    path="/login"
                                    redirectTo="/contacts"
                                    restricted
                                >
                                    <LoginView />
                                </PublicRoute>

                                <PrivateRoute
                                    path="/contacts"
                                    redirectTo="/login"
                                >
                                    <ContactsView />
                                </PrivateRoute>
                            </Switch>
                        </Suspense>
                    </Container>
                </>
            )}
        </>
    );
}
