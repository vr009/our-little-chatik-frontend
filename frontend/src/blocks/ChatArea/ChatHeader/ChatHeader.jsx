import s from "./ChatHeader.module.css"

export default function ChatHeader (props) {
    return (
        <div className={s.header}>
            <p>{props.name}</p>
        </div>
    )
}
