import {Link, useLocation} from "react-router-dom";
import React from "react";

export function AuthorizationForm(props) {
    const location = useLocation();

    return (
        <div className="authorization root__container" id={`${props.name}`}>
            <h1 className="authorization__title">{props.text}</h1>
            <form className="authorization__form" onSubmit={props.onSubmit} noValidate>
                {props.children}
                <button className={`authorization__button`} type="submit">
                    {props.buttonName}
                </button>
                {location.pathname === "/react-mesto-auth/sign-up" && (
                    <p style={{
                        color: "white",
                        textAlign: "center",
                        margin: "20px 30px 0",
                        padding: "0",
                        fontSize: "14px",
                        lineHeight: '17px',
                    }}>
                        Уже зарегистрированы? <Link to="/react-mesto-auth/sign-in"
                                                    style={{color: "white", textDecoration: "none"}}>Войти</Link></p>
                )}
            </form>
        </div>
    );
}
