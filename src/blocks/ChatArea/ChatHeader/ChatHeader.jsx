import s from "./ChatHeader.module.css"
import Picture from "../../../components/picture/Picture";

export default function ChatHeader (props) {
    
    return (
        <div className={s.header}>
            <div className={s.content}>
                <Picture
                    class={s.avatar}
                    src={'https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg'}
                    alt={'Профиль'}
                />
                <div className={s.info}>
                    Имя Фамилия
                </div>
            </div>
        </div>
    )
}
