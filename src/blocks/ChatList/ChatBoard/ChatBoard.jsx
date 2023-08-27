import {ChatItem, LoadingChatItem} from "../ChatItem/ChatItem.jsx";
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

    const chatListParsed = useSelector((state) => state.chatList.searchChats.searchedChats);

    const chatList = useSelector((state) => state.chatList.chats);

    const chatListStatus = useSelector((state) => state.chatList.status);
    const chatListError = useSelector((state) => state.chatList.error);

    useEffect(()=>{
        dispatch(getChats());
    },[dispatch])

    return (
        <div className={s.board}>
            {
                (((chatListStatus === "Fulfilled") && (chatList.length === 0)) &&
                    <div className={s.error}>
                        <b>You don`t have any chats</b>
                        <br/>
                        <br/>
                        Click to button on the right of input to add new chats
                    </div>
                )
            }

            {
                ((chatListStatus === "Fulfilled") && (!chatListError)) &&
                    chatListParsed.map((element) => {
                        return (
                            <ChatItem
                                avatar={element.avatar}
                                name={element.name}
                                surname={element.name}
                                lastMessage={element.lastMessage}
                                chatId={element.chat_id}
                                key={element.chat_id}
                                type={'Chatboard'}
                            />
                        )
                    }
                )
            }

            {
                (((chatListStatus === "Pending") && (!chatListError)) &&
                        <Loader/>
                )
            }

            {
                (((chatListStatus === "Rejected") || (chatListError)) &&
                    <div className={s.error}>
                        <b>Ops! There is an error:
                        <br/>{chatListError.message}</b>
                        <br/>
                        <br/>
                        Try to reload this page
                    </div>
                )
            }
        </div>
    );
}
