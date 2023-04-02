import s from "./Messages.module.css"
import {Message, MessageLoader} from "./Message";
import {useEffect} from "react";
import {scrollToBottom} from "../../../utils/utils";
import {useDispatch, useSelector} from "react-redux";
import {fetchMessages} from "../../../store/messagesSlice.js";
import ChatListService from "../../../service/ChatListService";
import { IUser } from "../../../models/IUser";
import React from "react";


// const storedUserInfo : IUser = useSelector((state : any) => state.user.userInfo);

// const YOUR_ID = storedUserInfo.user_id;

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

        ChatListService.getMessages(props.chatId)
            .then((res) => {
                console.log('Список сообщений из чата:', props.chatId);
                console.log(res.data);
                console.log('------');
                dispatch(s)
            })
            .catch((e) => {
                console.log(e);
            })   
    },[])

    // const messagesList = useSelector((state) => state.messageList.messages);
    // const chatListStatus = useSelector((state) => state.messageList.status);
    // const chatListError = useSelector((state) => state.messageList.error);

    // useEffect(()=>{
    //     dispatch(fetchMessages(props.id));
    // },[props.id])


    // useEffect(() => {
    //     scrollToBottom(props.container)
    // }, [props.container, messagesList]);

    return (
        <>
            <div className={s.error}>
                    Возникла ошибка загрузки сообщений
            </div>
            {/* {(chatListError !== null) && (
                <div className={s.error}>
                    Возникла ошибка загрузки сообщений
                </div>
            )}
            {(chatListStatus === "pending") && (
                <Loader/>
            )}
            {(chatListStatus === "fulfilled") &&
                messagesList.map((message,index) => {
                    return <Message key={index} text={message.Payload} isMine={(message.SenderID === YOUR_ID)} date={message.CreatedAt}/>
                })
            } */}
        </>
    )
}
