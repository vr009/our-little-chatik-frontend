import s from "./ChatArea.module.css"
import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import {getMessages} from "../../mocks/serviceMocks.js";
import Messages from "./Messages/Messages";



export default function ChatArea() {
    const params = useParams()

    const [messages, setMessages] = useState(null)

    useEffect( () => {
        const current = params.userId
        getMessages(current).then(data => {
            setMessages(data);
        })
    })

    return (
        <>
            <div className={s.main}>
                <h1> Ops! </h1>
                <h2> There should be a chat with userID {params.userId} </h2>
                <Messages messageItems={messages} />
            </div>
        </>
    );
}
