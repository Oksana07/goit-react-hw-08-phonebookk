import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getUserName } from 'redux/auth/auth-selectors';
import { logOut } from 'redux/auth/auth-operation';
import defaultAvatar from './avatar.png';
import s from './UserMenu.module.css';

export default function UserMenu() {
    const dispatch = useDispatch();
    const name = useSelector(getUserName);
    const avatar = defaultAvatar;

    return (
        <div className={s.container}>
            <img src={avatar} alt="avatar" width="32" className={s.avatar} />
            <span className={s.name}>Welcome, {name}</span>
            <button
                type="button"
                onClick={() => {
                    dispatch(logOut());
                    toast.info('You logged out of your account !', {
                        position: 'top-center',
                        autoClose: 2500,
                    });
                }}
            >
                Log Out
            </button>
        </div>
    );
}
