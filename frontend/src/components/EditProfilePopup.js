import {Input} from "./Input";
import {PopupWithForm} from "./PopupWithForm";
import {useForm} from "../hooks/useForm";
import {useContext, useEffect} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export function EditProfilePopup(props) {
    const {currentUser} = useContext(CurrentUserContext)
    const {values, handleChange, errors, isValid, setValues, setIsValid, setErrors} = useForm({
        name: '',
        about: ''
    });

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name: values.name,
            about: values.about,
        });
    }

    useEffect(() => {
        if (props.isOpen) {
            setValues({
                name: currentUser.name || '',
                about: currentUser.about || ''
            })
            setIsValid(true)
            setErrors({})
        }
    }, [props.isOpen, currentUser, setValues, setIsValid, setErrors])

    return (
        <PopupWithForm
            name="edit-profile"
            title="Редактировать профиль"
            button="Сохранить"
            loadButton="Сохранение..."
            onClose={props.onClose}
            isOpen={props.isOpen}
            onSubmit={handleSubmit}
            isValid={isValid}
            isLoad={props.isLoad}
        >
            <Input
                type="text"
                className="heading"
                id="name"
                name="name"
                placeholder="Имя"
                minLength="2"
                maxLength="40"
                value={values.name || ''}
                onChange={handleChange}
            />
            <span className="form__input-error name-error">{errors.name}</span>
            <Input
                type="text"
                className="subheading"
                id="about-person"
                name="about"
                placeholder="О себе"
                minLength="2"
                maxLength="200"
                value={values.about || ''}
                onChange={handleChange}
            />
            <span className="form__input-error about-person-error">{errors.about}</span>
        </PopupWithForm>
    )
}