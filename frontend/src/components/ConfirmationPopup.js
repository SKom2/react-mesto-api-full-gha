import {PopupWithForm} from "./PopupWithForm";
import {useForm} from "../hooks/useForm";

export function ConfirmationPopup(props) {
    const {isValid} = useForm();

    function handleSubmit(e) {
        e.preventDefault();
        props.onCardDelete(props.card)
    }

    return (
        <PopupWithForm
            name="delete-card"
            title="Вы уверены?"
            button="Да"
            loadButton="Удаление..."
            onClose={props.onClose}
            isOpen={props.isOpen}
            onSubmit={handleSubmit}
            isValid={!isValid}
            isLoad={props.isLoad}
        />
    )
}