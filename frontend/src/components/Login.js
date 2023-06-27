import React from "react";
import {Input} from "./Input";
import {AuthorizationForm} from "./AuthorizationForm";
import {useForm} from "../hooks/useForm";
import {useNavigate} from "react-router-dom";
import {Api} from "../modules/Api";
import {apiConfig} from "../utils/constants";

export function Login(props) {
    const {values, handleChange, errors, isValid} = useForm({
        email: '',
        password: ''
    });
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault();
        props.loginUser(values, isValid, navigate)
    }

    return (
        <>
            <AuthorizationForm
                text="Вход"
                buttonName="Войти"
                onSubmit={handleSubmit}
                name="authorization"
                isvalid={isValid}
            >
                <Input
                    type="email"
                    className="authorization"
                    id="authorization-email"
                    name="email"
                    placeholder="Email"
                    value={values.email || ''}
                    onChange={handleChange}
                />
                <span className="form__input-error email-error">{errors.email}</span>
                <Input
                    type="password"
                    className="authorization"
                    id="authorization-password"
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
