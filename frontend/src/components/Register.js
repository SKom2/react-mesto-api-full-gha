import React from "react";
import {useNavigate} from "react-router-dom";
import {Input} from "./Input";
import {AuthorizationForm} from "./AuthorizationForm";
import {useForm} from "../hooks/useForm";

export function Register(props) {
    const {values, handleChange, errors, isValid} = useForm({
        email: '',
        password: ''
    });
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault();
        console.log(values)
        props.registerUser(values, isValid, navigate)
    }

    return (
        <>
            <AuthorizationForm
                text="Регистрация"
                buttonName="Зарегистрироваться"
                onSubmit={handleSubmit}
                name="registration"
                isvalid={isValid}
            >
                <Input
                    type="email"
                    className="authorization"
                    id="registration-email"
                    name="email"
                    placeholder="Email"
                    value={values.email || ''}
                    onChange={handleChange}
                />
                <span className="form__input-error email-error">{errors.email}</span>
                <Input
                    type="password"
                    className="authorization"
                    id="registration-password"
                    name="password"
                    placeholder="Пароль"
                    value={values.password || ''}
                    onChange={handleChange}
                    minLength="8"
                    maxLength="40"
                />
                <span className="form__input-error password-error">{errors.password}</span>
            </AuthorizationForm>
        </>
    )
}