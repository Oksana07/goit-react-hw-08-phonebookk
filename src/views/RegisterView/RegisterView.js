import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { toast } from 'react-toastify';
import { register } from 'redux/auth/auth-operation';
import { getIsLoggedIn } from 'redux/auth/auth-selectors';
import s from './RegisterView.module.css';

export default function RegisterView() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = ({ target: { name, value } }) => {
        switch (name) {
            case 'name':
                return setName(value);
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
        dispatch(register({ name, email, password }));
        toast.success(`Welcome, ${name}!`, {
            position: 'top-center',
            autoClose: 2500,
        });
        setEmail('');
        setName('');
        setPassword('');
    };

    return (
        <>
            <h2 className={s.title}>Sign Up</h2>
            <div className={s.contactForm}>
                <form onSubmit={handleSubmit}>
                    <label className={s.label}>
                        Login
                        <input
                            className={s.formInput}
                            type="text"
                            name="name"
                            value={name}
                            placeholder="Your Full Name"
                            onChange={handleChange}
                        />
                    </label>

                    <label className={s.label}>
                        Email
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
                            minlength="8"
                            placeholder="Your Password"
                            onChange={handleChange}
                        />
                    </label>

                    <button
                        type="submit"
                        disabled={!name || !email || !password}
                    >
                        Submit
                    </button>
                </form>
                {isLoggedIn && <Redirect to="/" />}
            </div>
        </>
    );
}
