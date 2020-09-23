import axios from 'axios';
import React from 'react'
import './login.scss'

export const Login = () => {
    const loginUser = (e: any) => {
        e.preventDefault();
        const userNameElement = document.getElementsByName('username')[0] as any;
        const passwordElement = document.getElementsByName('username')[0] as any;

        axios.post("https://localhost:5001/api/login", null, {
            params: {
                username: userNameElement.value,
                password: passwordElement.value,
            }
        }).then((res) => console.log('res -> ', res))
    } 

    return (
        <div className="login-wrapper">
            <form className="form-wrapper" method="POST">
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
}