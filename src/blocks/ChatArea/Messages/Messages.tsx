import s from "./Messages.module.css"
import {Message, MessageLoader} from "./Message";
import {useEffect} from "react";
import {scrollToBottom} from "../../../utils/utils";
import {useDispatch, useSelector} from "react-redux";
import {getMessages, setActiveChat} from "../../../store/messagesSlice";
import ChatListService from "../../../service/ChatListService";
import { IUser } from "../../../models/IUser";
import React from "react";

export const Loader = () => (
    <>
        <MessageLoader/>
        <MessageLoader/>
        <MessageLoader/>
    </>
)

export default function Messages (props) {

    const dispatch = useDispatch()

    useEffect(() => {
        ChatListService.activateChat(props.chatId)
            .then(() => {
                console.log('Чат активирован',props.chatId)
                console.log('------');
            })
            .catch((e) => {
                console.log('Чат не активирован', props.chatId);
                console.log(e)
                console.log('------');
            })
        
        dispatch(setActiveChat(props.chatId))

        //@ts-ignore
        dispatch(getMessages({ chat_id: props.chatId }))
    },[dispatch,props.chatId])

    const messagesList = useSelector((state) => state.messageList.messages);
    const chatListStatus = useSelector((state) => state.messageList.status);
    const chatListError = useSelector((state) => state.messageList.error);

    const YOUR_ID = useSelector((state) => state.user.userInfo.user_id);

    // useEffect(()=>{
    //     dispatch(fetchMessages(props.id));
    // },[props.id])


    // useEffect(() => {
    //     scrollToBottom(props.container)
    // }, [props.container, messagesList]);

    return (
        <>
            {((chatListError) && (chatListStatus !== "Rejected")) && (
                <div className={s.error}>
                    <p>There is an error {chatListError}</p>
                </div>
            )}

            {((chatListStatus === "Pending") && (!chatListError)) && (
                <Loader/>
            )}

            {((chatListStatus === "Fulfilled") && (messagesList === null)) && (
                <div className={s.error}>
                    There are no messages now :(
                </div>
            )}

            {((chatListStatus === "Fulfilled") && (messagesList)) &&
                messagesList.map((message) => {
                    return <Message key={message.msg_id} payload={message.Payload} isMine={(message.SenderID === YOUR_ID)} date={message.CreatedAt} chat_id={""} created_at={false} msg_id={""} sender_id={""}/>
                })
            }
        </>
    )
}
