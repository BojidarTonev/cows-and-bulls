import React from 'react'
import './form.scss'

export interface IFormProps {
    label: string;
    placeholder: string;
    type: string;
    name: string;
}

export const Form = (props: any) => {
    const { fields, button } = props
    const fieldsRender = fields.map((f: IFormProps) => (
        <label htmlFor={f.name} className="label">
            {f.label}
            <input name={f.name} type={f.type} placeholder={f.placeholder} className="input" />
        </label>
    ))

    return (
        <form className="form-wrapper">
            {fieldsRender || []}
            {button || <><button>btn</button></>}
        </form>
    )
}