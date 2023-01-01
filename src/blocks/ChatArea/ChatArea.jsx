import s from "./ChatArea.module.css"
import { useParams } from "react-router-dom";
import {useCallback, useEffect, useRef, useState} from "react";
import {getMessages} from "../../mocks/serviceMocks.js";
import Messages from "./Messages/Messages";
import ChatHeader from "./ChatHeader/ChatHeader";

const YOUR_ID = "337295eb-cbde-479c-a4ee-683019adc838";

export default function ChatArea() {
    const params = useParams()

    const [messages, setMessages] = useState(null)
    const [isReady, setReady] = useState(false);

    const inputRef = useRef(null);
    const containerRef = useRef(null);

    useEffect( () => {
        setReady(false);
        const current = params.userId
        getMessages(current)
            .then(data => {
                setMessages(data);
                setReady(true);
        })
    },[params.userId])

    const handleAddMessageClick = useCallback(() => {
        if (!inputRef.current) {
            return;
        }
        const message = inputRef.current.value;
        if (!message) {
            return;
        }

        let currentMessage = {
            "Payload": message,
            "SenderID": YOUR_ID,
            "CreatedAt": new Date().getTime()
        }

        console.log(currentMessage)

        setMessages((messages) => [...messages, currentMessage]);
        inputRef.current.value = "";
    }, []);


    const handleInputKeyPress = ((event) => {
            if (event.key === "Enter") {
                handleAddMessageClick();
            }
        });

    if (messages === 0) {
        return <h3 style={{margin: "auto"}}>Сообщений пока нет :( </h3>;
    }

    return (
        <>
            <div className={s.main}>
                <ChatHeader name={params.userId}/>
                <div className={s.messages} ref={containerRef}>
                    {
                        isReady ? <Messages
                            messageItems={messages}
                            container={containerRef.current}
                        /> : <h3 style={{margin: 'auto'}}>Загрузка информации...</h3>
                    }

                </div>
                <div className={s.inputs}>
                    <input
                        className={s.messageInput}
                        placeholder="сообщение"
                        ref={inputRef}
                        onKeyUp={handleInputKeyPress}
                    />
                    <button className={s.button} onClick={handleAddMessageClick}>
                        Отправить
                    </button>
                </div>
            </div>
        </>
    );
}
