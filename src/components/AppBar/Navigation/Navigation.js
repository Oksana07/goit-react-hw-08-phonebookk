import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getIsLoggedIn } from 'redux/auth/auth-selectors';
import s from './Navigation.module.css';

const Navigation = () => {
    const isLoggedIn = useSelector(getIsLoggedIn);
    return (
        <nav>
            <NavLink
                to="/"
                exact
                className={s.link}
                activeClassName={s.activeLink}
            >
                Home
            </NavLink>

            {isLoggedIn && (
                <NavLink
                    to="/contacts"
                    exact
                    className={s.link}
                    activeClassName={s.activeLink}
                >
                    Contacts
                </NavLink>
            )}
        </nav>
    );
};

export default Navigation;
