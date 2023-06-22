import {PopupWithForm} from "./PopupWithForm";
import {Input} from "./Input";
import {useForm} from "../hooks/useForm";
import {useEffect} from "react";

export function AddPlacePopup(props) {
    const {values, handleChange, resetForm, errors, isValid, setErrors, setIsValid} = useForm({
        name: '',
        link: ''
    });

    function handleSubmit(evt) {
        evt.preventDefault()

        props.onAddPlace({
            name: values.name,
            link: values.link
        })
    }

    useEffect(() => {
        if (props.isOpen) {
            resetForm()
            setIsValid(true)
            setErrors({})
        }
    }, [props.isOpen, setErrors, setIsValid, resetForm])

    return (
        <PopupWithForm
            name="add-cards"
            title="Новое место"
            button="Создать"
            loadButton="Создание..."
            onClose={props.onClose}
            isOpen={props.isOpen}
            onSubmit={handleSubmit}
            isValid={isValid}
            isLoad={props.isLoad}
        >
            <Input
                type="text"
                className="heading"
                id="photo-name"
                name="name"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                value={values.name || ''}
                onChange={handleChange}
            />
            <span className="form__input-error photo-name-error">{errors.name}</span>
            <Input
                type="url"
                className="subheading"
                id="photo-link"
                name="link"
                placeholder="Ссылка на картинку"
                value={values.link || ''}
                onChange={handleChange}
            />
            <span className="form__input-error photo-link-error">{errors.link}</span>
        </PopupWithForm>
    )
}