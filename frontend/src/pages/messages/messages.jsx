import s from './messages.module.css'
import ChatItem from "../../blocks/ChatList/ChatItem/ChatItem";
import chatIcon from "../../assets/newChat.svg"
import ChatBoard from "../../blocks/ChatList/ChatBoard/ChatBoard";
import { Outlet } from "react-router-dom";
import {useEffect, useState} from "react";
import {getChats} from "../../mocks/serviceMocks.js";


export default function MessagesPage(props) {
    const [chats, setChats] = useState(null);

    useEffect(() => {
        getChats().then(data => {
                setChats(data)
            }
        );
    });

    return (
        <div className={s.layout}>
            <div className={s.chatlist}>
                <div className={s.inputs}>
                    <div className={s.сontent}>
                        <input
                            className={s.messageInput}
                            placeholder="Найти чат"
                        />
                        <div className={s.addIcon}>
                            <img src={chatIcon}/>
                        </div>
                    </div>
                </div>
                <ChatBoard chats={chats}/>
            </div>
            <content>
                <div className={s.chatarea}>
                    <Outlet/>
                </div>
            </content>
        </div>
    );
}
