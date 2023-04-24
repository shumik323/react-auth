import React, { FC, useContext, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import { ROUTES } from "../../constants/routes";
import './sign-up-form.scss';

const SignUpForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { store } = useContext(Context);

    const navigate = useNavigate();
    const { state } = useLocation();

    const onSuccessfulRegister = async () => {
        await navigate(state?.path || `${ROUTES.SIGN_IN}`);
    };

    const handleRegistration = async () => {
        try {
            await store.registration(
                email,
                password,
                onSuccessfulRegister,
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="parent">
            <div className='login-form-sign-up'>
                <h3 className='title'>sign up</h3>
                <div className="field-sign-up">
                    <label htmlFor="email">
                        Enter your email
                    </label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="text"
                        placeholder="Email"
                    />
                </div>
                <div className="field-sign-up">
                    <label htmlFor="password">
                        Enter your password
                    </label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        placeholder="Password"
                    />
                </div>
                <button className='button  btn-register' onClick={handleRegistration}>sign up</button>
            </div>
        </div>
    );
};

export default observer(SignUpForm);
