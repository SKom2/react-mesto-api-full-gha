import React, {useContext} from "react";
import {Card} from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {Footer} from "./Footer";

export function Main(props) {
    const {currentUser, cards} = useContext(CurrentUserContext)

    return (
        <>
            <main className="main">
                <section className="main__profile profile root__container">
                    <div className="profile__body">
                        <button
                            className="profile__edit-avatar"
                            onClick={props.onEditAvatar}
                            style={{backgroundImage: `url(${currentUser.avatar})`}}>
                        </button>
                        <div className="profile__info">
                            <div className="profile__header">
                                <h1 className="profile__title">{currentUser.name}</h1>
                                <button
                                    aria-label="Кнопка для открытия попапа"
                                    type="button"
                                    className="profile__button profile__button_type_edit button"
                                    id="button_edit"
                                    onClick={props.onEditProfile}>
                                </button>
                            </div>
                            <p className="profile__subtitle">{currentUser.about}</p>
                        </div>
                        <button
                            type="button"
                            className="profile__button profile__button_type_add button"
                            id="button_add"
                            onClick={props.onAddPlace}>
                        </button>
                    </div>
                </section>
                <section className="main__places places root__container">
                    {cards.map((card) => (
                        <Card
                            card={card}
                            key={card._id}
                            onCardClick={props.onCardClick}
                            onCardLike={props.onCardLike}
                            onCardDeleteIconClick={props.onCardDeleteIconClick}
                        />
                    ))}
                </section>
                <Footer/>
            </main>
        </>
    )
}