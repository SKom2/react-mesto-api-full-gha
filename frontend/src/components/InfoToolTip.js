import SuccessfulImage from "../images/authorization/Successful.svg"
import NotSuccessfulImage from "../images/authorization/NotSuccessful.svg"

export function InfoToolTip(props) {
    return (
        <div className={`prompt ${props.isOpen ? "prompt_opened" : ""}`} onClick={props.onClose}>
            <div className="prompt__container" onClick={e => e.stopPropagation()}>
                <button type="button" className="popup__close" onClick={props.onClose}></button>
                <div className="prompt__info">
                    <div className="prompt__image"
                         style={{backgroundImage: `${props.isSuccessful ? `url(${SuccessfulImage})` : `url(${NotSuccessfulImage})`}`}}></div>
                    <p className="prompt__text">{props.promptText}</p>
                </div>
            </div>
        </div>
    )
}