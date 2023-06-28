import '../App.css';
import {Main} from "./Main";
import {Login} from "./Login";
import {Register} from "./Register";
import {ImagePopup} from "./ImagePopup";
import React, {useEffect, useState} from "react";
import {Api} from "../modules/Api";
import {apiConfig} from "../utils/constants";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {EditProfilePopup} from "./EditProfilePopup";
import {EditAvatarPopup} from "./EditAvatarPopup";
import {AddPlacePopup} from "./AddPlacePopup";
import {ConfirmationPopup} from "./ConfirmationPopup";
import {Routes, Route, useNavigate} from "react-router-dom";
import {ProtectedRouteElement} from "./ProtectedRoute";
import {InfoToolTip} from "./InfoToolTip";
import * as Auth from "../modules/Auth";
import {NavBar} from "./NavBar";
import {Header} from "./Header";
const api = new Api(apiConfig);

function App() {
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [isClickCardPopupOpen, setClickCardPopupOpen] = useState(false);
    const [isConfirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
    const [isInfoToolTipOpen, setInfoToolTipOpen] = useState(false)
    const [isLoad, setLoadState] = useState(false)
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [isSuccessful, setIsSuccessful] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userData, setUserData] = useState({
        email: ''
    })
    const [isMenuOpened, setMenuOpened] = useState(true);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 700);
    const [promptText, setPromptText] = useState('')
    const [token, setToken] = useState('')

    // eslint-disable-next-line react-hooks/exhaustive-deps

    const navigate = useNavigate()

    useEffect(() => {
        const jwt = localStorage.getItem('jwt')
        setToken(jwt)
        if (token) {
            Auth.getContent(token)
                .then((res) => {
                    setIsLoggedIn(true);
                    setUserData({email: res.email});
                    navigate("/", {replace: true});
                })
                .catch(err => console.log(`Ошибка получения данных пользователя: ${err}`));
        }

        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 700);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [isLoggedIn, token, navigate])


    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }
        api.getProfile()
            .then((userData) => {
                setCurrentUser(userData);
            })
            .catch(err => console.log(`Ошибка получения данных пользователя: ${err}`));

        api.getCards()
            .then((cardsData) => {
                setCards(cardsData);
            })
            .catch(err => console.log(`Ошибка получения карточек: ${err}`));

    }, [api, isLoggedIn, token, navigate]);

    function handleMenuIconClick() {
        setMenuOpened(!isMenuOpened);
    }

    function registerUser(values, isValid, navigate) {
        if (isValid) {
            Auth.register(values.email, values.password)
                .then((res) => {
                    setIsSuccessful(true)
                    setInfoToolTipOpen(true)
                    setPromptText("Вы успешно зарегистрировались!")
                    navigate('/sign-in', {replace: true})
                })
                .catch(() => {
                    setPromptText("Что-то пошло не так! Попробуйте ещё раз.")
                    setIsSuccessful(false)
                    setInfoToolTipOpen(true)
                });
        }
    }

    function loginUser(values, isValid, navigate) {
        if (isValid) {
            Auth.authorize(values.email, values.password)
                .then((res) => {
                    localStorage.setItem('jwt', res.token)
                    setToken(res.token)
                    setUserData({email: values.email})
                    setIsLoggedIn(true)
                    navigate('/', {replace: true})
                })
                .catch(() => {
                    setIsSuccessful(false)
                    setInfoToolTipOpen(true)
                    setPromptText("Не правильный логин или пароль!")
                });
        }
    }

    function signOut() {
        localStorage.removeItem('jwt');
        setUserData('')
        setIsLoggedIn(false)
        setToken('')
    }

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true)
    }

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }

    function handleCardImageClick(card) {
        setClickCardPopupOpen(true);
        setSelectedCard(card);
    }

    function handleDeleteIconClick(card) {
        setConfirmationPopupOpen(true);
        setSelectedCard(card)
    }

    function closeAllPopups() {
        setAddPlacePopupOpen(false)
        setEditProfilePopupOpen(false)
        setEditAvatarPopupOpen(false)
        setClickCardPopupOpen(false)
        setConfirmationPopupOpen(false)
        setInfoToolTipOpen(false)
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);
        if (isLiked) {
            api.handleControlLikes("DELETE", card._id)
                .then((newCard) => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
                })
                .catch(err => console.log(`Ошибка удаления лайка: ${err}`))
        } else {
            api.handleControlLikes("PUT", card._id)
                .then((newCard) => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
                })
                .catch(err => console.log(`Ошибка добавления лайка: ${err}`))
        }
    }

    function handleCardDelete(card) {
        setLoadState(true)
        api.deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id));
                closeAllPopups()
            })
            .catch(err => console.log(`Ошибка удаления карточки: ${err}`))
            .finally(() => {
                setLoadState(false);
            })
    }

    function handleUpdateUser(data) {
        setLoadState(true)
        api.editProfile(data)
            .then((updateUser) => {
                setCurrentUser(updateUser)
                closeAllPopups()
            })
            .catch(err => console.log(`Ошибка редактирования профиля: ${err}`))
            .finally(() => {
                setLoadState(false);
            })
    }

    function handleUpdateAvatar({avatar}) {
        setLoadState(true)
        api.editAvatar(avatar)
            .then((updateAvatar) => {
                setCurrentUser(updateAvatar);
                closeAllPopups();
            })
            .catch(err => console.log(`Ошибка добавления аватара: ${err}`))
            .finally(() => {
                setLoadState(false);
            })
    }

    function handleAddPlaceSubmit(data) {
        setLoadState(true)
        api.addCard(data)
            .then((newCard) => {
                console.log(newCard)
                setCards([newCard, ...cards])
                closeAllPopups()
            })
            .catch(err => console.log(`Ошибка добавления карточки: ${err}`))
            .finally(() => {
                setLoadState(false);
            })
    }

    return (
        <CurrentUserContext.Provider value={{currentUser, cards}}>
            {isLoggedIn &&
                <NavBar
                    loggedIn={isLoggedIn}
                    userData={userData}
                    isMenuOpened={isMenuOpened}
                    signOut={signOut}
                />
            }
            <div
                className={`content ${(isMenuOpened && window.innerWidth < 700 && isLoggedIn) ? 'content_active' : ''}`}>
                <Header
                    userData={userData}
                    loggedIn={isLoggedIn}
                    isMenuOpened={isMenuOpened}
                    signOut={signOut}
                    isDesktop={isDesktop}
                    onMenuIconClick={handleMenuIconClick}
                />
                <Routes>
                    <Route path="/" element={<ProtectedRouteElement loggedIn={isLoggedIn}
                                                                                element={Main}
                                                                                userData={userData}
                                                                                onEditProfile={handleEditProfileClick}
                                                                                onAddPlace={handleAddPlaceClick}
                                                                                onEditAvatar={handleEditAvatarClick}
                                                                                onCardClick={handleCardImageClick}
                                                                                onCardDeleteIconClick={handleDeleteIconClick}
                                                                                onCardLike={handleCardLike}
                    />}/>
                    <Route path="/sign-in" element={<Login loginUser={loginUser}/>}/>
                    <Route path="/sign-up" element={<Register registerUser={registerUser}/>}/>
                </Routes>
            </div>
            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
                isLoad={isLoad}
            />
            <EditAvatarPopup
                onClose={closeAllPopups}
                isOpen={isEditAvatarPopupOpen}
                onUpdateAvatar={handleUpdateAvatar}
                isLoad={isLoad}
            />
            <AddPlacePopup
                onClose={closeAllPopups}
                isOpen={isAddPlacePopupOpen}
                onAddPlace={handleAddPlaceSubmit}
                isLoad={isLoad}
            />
            {selectedCard &&
                <ConfirmationPopup
                    onClose={closeAllPopups}
                    isOpen={isConfirmationPopupOpen}
                    onCardDelete={handleCardDelete}
                    card={selectedCard}
                    isLoad={isLoad}
                />
            }
            {selectedCard && (
                <ImagePopup
                    id={selectedCard._id}
                    link={selectedCard.link}
                    name={selectedCard.name}
                    isOpen={isClickCardPopupOpen}
                    onClose={closeAllPopups}
                />
            )}
            <InfoToolTip
                promptText={promptText}
                isOpen={isInfoToolTipOpen}
                onClose={closeAllPopups}
                isSuccessful={isSuccessful}
            />
        </CurrentUserContext.Provider>
    );
}

export default App;
