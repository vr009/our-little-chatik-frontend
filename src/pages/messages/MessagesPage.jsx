import s from './messages.module.css'
import chatIcon from "../../assets/newChat.svg"
import ChatBoard from "../../blocks/ChatList/ChatBoard/ChatBoard";
import { Outlet } from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {searchChats} from "../../store/chatListSlice.js";



export default function MessagesPage(props) {

    const chatList = useSelector((state) => state.chatList.chats);

    const dispatch = useDispatch();

    const searchRef = useRef('');

    function handleChange() {
        // if (searchRef.current.value !== '') {
        //     dispatch(searchChats(searchRef.current.value))
        // }
        dispatch(searchChats(searchRef.current.value))
    }

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

                <ChatBoard/>

            </div>
            <div className={s.chatContent}>
                <div className={s.chatarea}>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}
