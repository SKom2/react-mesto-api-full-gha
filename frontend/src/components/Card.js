import {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export function Card(props) {
    const {currentUser} = useContext(CurrentUserContext)

    const isOwn = props.card.owner === currentUser._id;
    const isLiked = props.card.likes.some(i => i === currentUser._id);

    const cardLikeButtonClassName = (
        `card__like ${isLiked && 'card__like_active'}`
    );

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    function handleDeleteClick() {
        props.onCardDeleteIconClick(props.card)
    }

    return (
        <>
            <article className="card" key={props.card._id}>
                <img
                    alt=""
                    className="card__image"
                    style={{backgroundImage: `url(${props.card.link})`}}
                    onClick={() => props.onCardClick(props.card)}
                ></img>
                <div className="card__heading">
                    <h2 className="card__title">{props.card.name}</h2>
                    <div className="card__likes">
                        <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}>
                            {props.card.likes._id}
                        </button>
                        <span className="card__like-counter">{props.card.likes.length}</span>
                    </div>
                </div>
                {isOwn && <button type="button" className="card__delete" onClick={handleDeleteClick}></button>}
            </article>
        </>
    );
}
