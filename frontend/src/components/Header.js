import Logo from "../images/header/Vector.svg";
import close from "../images/popup/Close.svg";
import {Link, Route, Routes} from "react-router-dom";

export function Header(props) {
    return (
        <>
            <header className="header root__container">
                <img src={Logo} alt="Место" className="header__logo"></img>
                {props.loggedIn && (!props.isMenuOpened ? (
                    <div className="header__burger-btn" onClick={props.onMenuIconClick}>
                        <span/>
                    </div>
                ) : (
                    <div className="header__burger-close-btn">
                        <img
                            onClick={props.onMenuIconClick}
                            src={close}
                            style={{width: "20px", height: "20px"}}
                            alt="Close"
                        />
                    </div>
                ))}
                <div className="header__menu">
                    {props.loggedIn && props.isDesktop &&
                        <p className="header__email menu__email">{props.userData.email}</p>
                    }
                    {(props.isDesktop || !props.loggedIn) && (
                        <Routes>
                            <Route path='/sign-up'
                                   element={<Link to='/sign-in' className="header__link">{'Войти'}</Link>}/>
                            <Route path='/sign-in' element={<Link to='/sign-up'
                                                                              className="header__link">{'Регистрация'}</Link>}/>
                            <Route path='/' element={<Link to='/sign-in' onClick={props.signOut}
                                                                      className="header__link">{'Выйти'}</Link>}/>
                        </Routes>
                    )}
                </div>
            </header>
        </>
    );
}
