import {PopupWithForm} from "./PopupWithForm";
import {Input} from "./Input";
import {useForm} from "../hooks/useForm";
import {useEffect} from "react";

export function EditAvatarPopup(props) {
    const {values, handleChange, resetForm, errors, isValid, setIsValid, setErrors} = useForm({
        avatar: ''
    });

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: values.avatar,
        });
        resetForm()
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
            name="edit-avatar"
            title="Обновить аватар"
            button="Сохранить"
            loadButton="Сохранение..."
            onClose={props.onClose}
            isOpen={props.isOpen}
            onSubmit={handleSubmit}
            isValid={isValid}
            isLoad={props.isLoad}
        >
            <Input
                type="url"
                className="heading"
                id="avatar-link"
                name="avatar"
                placeholder="Ссылка на картинку"
                value={values.avatar || ''}
                onChange={handleChange}
            >
            </Input>
            <span className="form__input-error avatar-link-error">{errors.avatar}</span>
        </PopupWithForm>
    )
}