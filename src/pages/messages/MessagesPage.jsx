import s from './messages.module.css'
import chatIcon from "../../assets/newChat.svg"
import ChatBoard from "../../blocks/ChatList/ChatBoard/ChatBoard";
import { Outlet } from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {getChats} from "../../mocks/serviceMocks.js";


export default function MessagesPage(props) {
    const [chats, setChats] = useState([]);

    const [searchChats, setSearchChats] = useState([]);

    const [isReady, setReady] = useState(true);

    const searchRef = useRef('');

    function handleChange() {
        if (searchRef.current.value !== '') {
            setSearchChats(chats.filter(chat => {
                return chat.name.toUpperCase().includes(searchRef.current.value.toUpperCase());
            }));
        } else {
            setSearchChats(chats);
        }
    }

    // useEffect(() => {
    //     setReady(false);
    //     getChats()
    //         .then(data => {
    //             setChats(data)
    //             setSearchChats(data)
    //             setReady(true)
    //         });
    // },[]);

    // useEffect(() => {
    //
    // },[]);

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

                {
                    isReady ?
                        <ChatBoard isReady={isReady} chats={searchChats}/>
                        : <h3 style={{margin: "auto"}}>Загрузка информации...</h3>
                }

            </div>
            <div className={s.chatContent}>
                <div className={s.chatarea}>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}
