import ChatItem from "../ChatItem/ChatItem.jsx";
import s from "./ChatBoard.module.css"
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchChats} from "../../../store/chatSlice.js";


export default function ChatBoard () {

    const dispatch = useDispatch()

    const chatList = useSelector((state) => state.chatList.chats);

    useEffect(()=>{
        dispatch(fetchChats());

    },[dispatch])

    return (
        <div className={s.board}>
            {
                chatList.map((element) => (
                        <ChatItem
                            avatar={element.avatar}
                            name={element.name}
                            surname={element.surname}
                            lastMessage={element.lastMessage}
                            userId={element.id}
                            key={element.id}
                        />
                ))
            }
        </div>
    );
}
