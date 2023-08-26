import s from "./ChatHeader.module.css"
import Picture from "../../../components/picture/Picture";
import {useSelector} from "react-redux";
import React, {useEffect} from "react";
import {Skeleton} from "../../../components/sceleton/Sceleton";
import defaultAvatar from "../../../assets/png/default_avatar.png";


export const ChatHeader = React.memo((props) =>{

    const chatList = useSelector((state) => state.chatList.chats);
    const chatStatus = useSelector((state) => state.chatList.status);
    const currentChatId = useSelector((state) => state.messageList.activeChat)

    // const currentChat = chatList.find(chat=> chat.id === props.id)

    console.log(props.name)
    return (
        <div className={`${s.header} ${(props.isOnline) ? s.online : ''}`}>
            { (chatStatus === 'Fulfilled') &&
                <div className={s.content}>
                    <div className={s.avatar}>
                        <Picture
                            // src={ storedUserInfo.avatar ? storedUserInfo.avatar : defaultAvatar }
                            src={defaultAvatar }
                            alt={''}
                        />
                    </div>
                    {/* <div className={s.info}> */}
                    <div className={s.info}>
                        {currentChatId}
                        {/* {currentChat.name} {currentChat.surname} */}
                    </div>
                </div>
            }

            { (chatStatus === 'Pending') &&
                <div className={s.content}>
                    <div className={s.avatar}>
                        <Skeleton/>
                    </div>
                    <div className={s.info}>
                        <Skeleton/>
                    </div>
                </div>
            }
        </div>
    )
})
