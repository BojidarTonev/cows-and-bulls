import React from 'react'
import { Form } from '../form/form'
import './register.scss'

export const Register = () => {
    const formFields = [
        { label: "Username", placeholder: "Username...", name: "username", type: "text" },
        { label: "Password", placeholder: "Password...", name: "password", type: "password" },
        { label: "Confirm password", placeholder: "Confirm password...", name: "confirm-password", type: "password" },

    ]
    const button = <> <button>REGISTER</button></>
    return (
        <div className="register-wrapper">
            <Form fields={formFields} button={button} />
        </div>
    )
}

