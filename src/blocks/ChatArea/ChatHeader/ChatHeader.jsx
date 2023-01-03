import s from "./ChatHeader.module.css"
import Picture from "../../../components/picture/Picture";
import {useSelector} from "react-redux";

export default function ChatHeader (props) {

    const chatList = useSelector((state) => state.chatList.chats);

    const currentChat = chatList.find(chat=> chat.id === props.id)

    console.log(currentChat)

    return (
        <div className={s.header}>
            <div className={s.content}>
                <Picture
                    class={s.avatar}
                    src={currentChat.avatar}
                    alt={''}
                />
                <div className={s.info}>
                    {currentChat.name} {currentChat.surname}
                </div>
            </div>
        </div>
    )
}
