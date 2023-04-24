import React, { FC, useContext, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import { ROUTES } from "../../constants/routes";
import './sign-in-form.scss';

const SignInForm: FC = () => {
    const { store } = useContext(Context);
    const { state } = useLocation();
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const onSuccessfulLogin = async () => {
        await navigate(state?.path || `${ROUTES.HOME}`);
    };


    const handleLogin = async () => {
        try {
            await store.login(
                email,
                password,
                onSuccessfulLogin,
            );
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="parent">
                <div className='login-form'>
                    <h3 className='title'>sign in</h3>
                    <div className="field">
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="text"
                            placeholder="Email"
                        />
                    </div>
                    <div className="field">
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            placeholder="Password"
                        />
                    </div>
                    <button className='button btn-login' onClick={handleLogin}>sign in</button>
                    <button className='button' onClick={() => navigate(`${ROUTES.SING_UP}`)}>sign up</button>
                </div>
        </div>
    );
};

export default observer(SignInForm);
