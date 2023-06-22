import {useEffect} from "react";

export function PopupWithForm({button, children, isLoad, isOpen, isValid, loadButton, name, onClose, onSubmit, title}) {

    useEffect(() => {
        function handleEscClose(evt) {
            if (evt.key === 'Escape') {
                onClose();
            }
        }

        document.addEventListener('keydown', handleEscClose);
    }, [onClose]);


    return (
        <div className={`popup ${isOpen ? "popup_opened" : ""}`} id={`popup_${name}`} onClick={onClose}>
            <div className="popup__container" onClick={e => e.stopPropagation()}>
                <button type="button" className="popup__close" onClick={onClose}></button>
                <form className="popup__form form" id={`${name}_form`} noValidate name={name} onSubmit={onSubmit}>
                    <h2 className="form__title">{title}</h2>
                    {children}
                    <button className={`form__button ${!isValid ? "form__button_inactive" : ""}`} disabled={!isValid}
                            type="submit">{isLoad ? loadButton : button}</button>
                </form>
            </div>
        </div>
    )
}