export const Input = (props) => {
    return (
        <input
            type={props.type}
            className={`form__input form__input_el_${props.className}`}
            id={props.id}
            name={props.name}
            placeholder={props.placeholder}
            minLength={props.minLength}
            maxLength={props.maxLength}
            value={props.value || ''}
            onChange={props.onChange}
            required
        />
    )
}