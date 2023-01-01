import s from './messages.module.css'
import chatIcon from "../../assets/newChat.svg"
import ChatBoard from "../../blocks/ChatList/ChatBoard/ChatBoard";
import { Outlet } from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {getChats} from "../../mocks/serviceMocks.js";


export default function MessagesPage(props) {
    const [chats, setChats] = useState([]);

    const searchRef = useRef('');

    function handleChange() {
        if (chats !== []) {
            setChats(chats.filter(chat => {
                return chat.name.toUpperCase().includes(searchRef.current.value.toUpperCase());
            }));
        }
    }

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
                            ref={searchRef}
                            onChange={handleChange}
                        />
                        <div className={s.addIcon}>
                            <img src={chatIcon}/>
                        </div>
                    </div>
                </div>
                <ChatBoard chats={chats}/>
            </div>
            <div>
                <div className={s.chatarea}>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}
