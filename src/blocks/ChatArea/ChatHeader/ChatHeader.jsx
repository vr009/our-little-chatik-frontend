import s from "./ChatHeader.module.css"
import Picture from "../../../components/picture/Picture";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {Skeleton} from "../../../components/sceleton/Sceleton";
import defaultAvatar from "../../../assets/png/default_avatar.png";


export default function ChatHeader (props) {

    const chatList = useSelector((state) => state.chatList.chats);
    const chatStatus = useSelector((state) => state.chatList.status);

    //
    const currentChat = chatList.find(chat=> chat.id === props.id)

    return (
        <div className={s.header}>
            { (chatStatus === 'Fulfilled') &&
                <div style={{height: 100 + '%', marginLeft: 10 + 'px', display: 'flex', alignItems: 'center',}}>
                    {/* <Picture
                        // src={ storedUserInfo.avatar ? storedUserInfo.avatar : defaultAvatar }
                        src={defaultAvatar }
                        alt={''}
                    /> */}
                    {/* <div className={s.info}> */}
                    <div>
                        {props.id}
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
}
