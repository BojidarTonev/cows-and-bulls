import axios from 'axios'
import { observer } from 'mobx-react'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { appContext, ApplicationStore } from '../../store/appStore'
import './register.scss'

export const Register = observer(() => {
    const history = useHistory();
    const store: ApplicationStore = useContext(appContext);

    const registerUser = (e: any) => {
        e.preventDefault();
        const userNameElement = document.getElementsByName('username')[0] as any;
        const passwordElement = document.getElementsByName('password')[0] as any;
        const rePasswordElement = document.getElementsByName('re-password')[0] as any;
        axios.post("https://localhost:5001/api/register", null, {
            params: {
                username: userNameElement.value,
                password: passwordElement.value,
                rePassword: rePasswordElement.value
            }
        }).then((res) => {
            if (res.data.result.isSuccesful) {
                store.setError("");
                store.user = res.data.result.user;
                history.push("/");
            } else {
                store.setError(res.data.result.errorMessage);
            }
        })
    }
    return (
        <div className="register-wrapper">
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
                <label htmlFor="re-password" className="label">
                    Re-Password
                    <input name="re-password" type="password" placeholder="Re-Password.." className="input" />
                </label>
                <button onClick={(e) => registerUser(e)}>REGISTER</button>
            </form>
        </div>
    )
})

