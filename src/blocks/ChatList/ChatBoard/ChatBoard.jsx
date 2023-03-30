import ChatItem, {LoadingChatItem} from "../ChatItem/ChatItem.jsx";
import s from "./ChatBoard.module.css"
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getChats} from "../../../store/chatListSlice.js";

const Loader = () => (
    <>
        <LoadingChatItem/>
        <LoadingChatItem/>
        <LoadingChatItem/>
        <LoadingChatItem/>
        <LoadingChatItem/>
    </>
)

export default function ChatBoard () {

    const dispatch = useDispatch()

    const chatList = useSelector((state) => state.chatList.searchChats.searchedChats);

    // const chatListik = useSelector((state) => state.chatList.chats);

    const chatListStatus = useSelector((state) => state.chatList.status);
    const chatListError = useSelector((state) => state.chatList.error);

    return (
        <div className={s.board}>
            {
                ((chatListStatus === "Fulfilled") && (!chatListError)) &&
                    chatList.map((element) => {
                        return (
                            <ChatItem
                                avatar={element.avatar}
                                name={`${element.chat_id.slice(0,7)}...${element.chat_id.slice(-7)}`}
                                surname={''}
                                lastMessage={element.lastMessage}
                                // TODO вернуть user ID
                                // userId={element.id}
                                userId={element.chat_id}
                                key={element.id}
                                type={'Chatboard'}
                            />
                        )
                    }
                )
                }

            {
                (((chatListStatus === "pending") && (!chatListError)) &&
                        <Loader/>
                )
            }

            {
                ((chatListError) &&
                    <div className={s.error}>
                        <b>Возникла ошибка при загрузке данных</b>
                        <br/>
                        <br/>
                        Попробуйте перезагрузить страницу
                    </div>
                )
            }
        </div>
    );
}
