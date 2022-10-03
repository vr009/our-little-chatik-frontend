import s from "./ChatArea.module.css"
import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import {getMessages} from "../../mocks/serviceMocks.js";
import Messages from "./Messages/Messages";
import ChatHeader from "./ChatHeader/ChatHeader";



export default function ChatArea() {
    const params = useParams()

    const [messages, setMessages] = useState(null)

    useEffect( () => {
        const current = params.userId
        getMessages(current).then(data => {
            setMessages(data);
        })
    })

    if (messages === null) {
        return <h3 style={{margin: 'auto'}}>Загрузка информации...</h3>;
    }

    if (messages === 0) {
        return <h3 style={{margin: "auto"}}>Сообщений пока нет :( </h3>;
    }

    return (
        <>
            <div className={s.main}>
                <ChatHeader name={params.userId}/>
                <messageArea >

                    <div>
                        <Messages className={s.chat} messageItems={messages} />
                    </div>
                </messageArea>
            </div>
        </>
    );
}
