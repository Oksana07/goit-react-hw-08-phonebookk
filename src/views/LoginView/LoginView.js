import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { toast } from 'react-toastify';
import { logIn } from 'redux/auth/auth-operation';
import s from './LoginView.module.css';
import { getAuthError, getIsLoggedIn } from 'redux/auth/auth-selectors';

export default function LoginView() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const isUserError = useSelector(getAuthError);
    const isLoggedIn = useSelector(getIsLoggedIn);

    useEffect(() => {
        setError(isUserError);
    }, [isUserError]);

    const handleChange = ({ target: { name, value } }) => {
        switch (name) {
            case 'email':
                return setEmail(value);
            case 'password':
                return setPassword(value);
            default:
                return;
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(logIn({ email, password }));
        toast.success(`Welcome, ${email}!`, {
            position: 'top-center',
            autoClose: 2500,
        });
        setEmail('');
        setPassword('');
    };

    return !isLoggedIn ? (
        <>
            <h2 className={s.title}>Log In</h2>
            <div className={s.contactForm}>
                <form onSubmit={handleSubmit} className={s.form}>
                    <label className={s.label}>
                        Mail
                        <input
                            className={s.formInput}
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Your Email"
                            onChange={handleChange}
                        />
                    </label>

                    <label className={s.label}>
                        Password
                        <input
                            className={s.formInput}
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            placeholder="Your Password"
                        />
                    </label>

                    <button
                        type="submit"
                        disabled={!email && !password && !error}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    ) : (
        <Redirect to="/contacts" />
    );
}
