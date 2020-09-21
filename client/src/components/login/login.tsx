import React from 'react'
import { Form } from '../form/form'
import './login.scss'

export const Login = () => {
    const formFields = [
        { label: "username", placeholder: "Username...", name: "username", type: "text" },
        { label: "password", placeholder: "Password...", name: "password", type: "password" },
    ]
    const button = <> <button>LOGIN</button></>

    return (
        <div className="login-wrapper">
            <Form fields={formFields} button={button} />
        </div>
    )
}