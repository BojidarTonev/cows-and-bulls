import React, { useContext } from 'react'
import { appContext, ApplicationStore } from '../../store/appStore';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import axios from 'axios';
import './login.scss'

export const Login = observer(() => {
    const history = useHistory();
    const store: ApplicationStore = useContext(appContext);

    const loginUser = (e: any) => {
        e.preventDefault();
        const userNameElement = document.getElementsByName('username')[0] as any;
        const passwordElement = document.getElementsByName('password')[0] as any;

        axios.post("https://localhost:5001/api/login", null, {
            params: {
                username: userNameElement.value,
                password: passwordElement.value,
            }
        }).then((res: any) => {
            if (res.data.isSuccesful) {
                store.setError("");
                store.user = res.data.user;
                history.push("/")
            } else {
                store.setError(res.data.errorMessage);
            }
        })
    }

    return (
        <div className="login-wrapper">
            <form className="form-wrapper" method="POST">
                <div style={{ color: 'red' }}>{store.error}</div>
                <label htmlFor="username" className="label">
                    Username
                    <input name="username" type="text" placeholder="Username.." className="input" />
                </label>
                <label htmlFor="password" className="label">
                    Password
                    <input name="password" type="password" placeholder="Password.." className="input" />
                </label>
                <button onClick={(e) => loginUser(e)}>LOGIN</button>
            </form>
        </div>
    )
})