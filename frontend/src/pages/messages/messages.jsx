import s from './messages.module.css'
import ChatItem from "../../blocks/ChatList/ChatItem/ChatItem";
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
            <menu>
                <ChatBoard chats={chats}/>
            </menu>
            <content>
                <div className={s.chatarea}>
                    <Outlet/>
                </div>
            </content>
        </div>
    );
}
