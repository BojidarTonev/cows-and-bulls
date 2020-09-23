import axios from 'axios'
import React from 'react'
import './register.scss'

export const Register = () => {
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
        }).then((res) => console.log('res -> ', res))
    }
    return (
        <div className="register-wrapper">
            <form className="form-wrapper" method="POST">
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
}

