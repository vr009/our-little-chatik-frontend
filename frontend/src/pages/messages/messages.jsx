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
            <ChatBoard chats={chats}/>
            <div className={s.chatarea}>
                <Outlet/>
            </div>
        </div>
    );
}
