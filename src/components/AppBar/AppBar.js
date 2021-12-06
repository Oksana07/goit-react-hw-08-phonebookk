import { useSelector } from 'react-redux';
import { getIsLoggedIn } from 'redux/auth/auth-selectors';

import Navigation from './Navigation';
import AuthNav from './AuthNav';
import UserMenu from './UserMenu';

import s from './AppBar.module.css';

export default function AppBar() {
    const isLoggedIn = useSelector(getIsLoggedIn);

    return (
        <header className={s.header}>
            <Navigation />
            {isLoggedIn ? <UserMenu /> : <AuthNav />}
        </header>
    );
}
