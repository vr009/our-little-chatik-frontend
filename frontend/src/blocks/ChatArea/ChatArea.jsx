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

    const inputRef = useRef(null);
    const containerRef = useRef(null);

    useEffect( () => {
        const current = params.userId
        getMessages(current).then(data => {
            setMessages(data);
        })
        console.log(messages)
    },[params.userId])

    const handleAddMessageClick = useCallback(() => {
        if (!inputRef.current) {
            return;
        }
        const message = inputRef.current.value;
        if (!message) {
            return;
        }

        let currentDate = new Date()


        let currentMessage = {
            "Payload": message,
            "SenderID": YOUR_ID,
            "CreatedAt": currentDate.getTime()
        }

        console.log(currentMessage)

        setMessages((messages) => [...messages, currentMessage]);
        inputRef.current.value = "";
    }, []);


    // setInterval(function() {
    //
    //     const myArray = ['Говно', 'Какашка', 'Блеа', 'Как дела', 'Заколебёшь'];
    //     let rand = Math.floor(Math.random()*myArray.length);
    //
    //     let currentMessage = {
    //         "Payload": myArray[rand],
    //         "SenderID": "wqeqr123fsdf112ewq"
    //     }
    //     setMessages((messages) => [...messages, currentMessage]);
    //     console.log(currentMessage)
    // }, 15000)

    const handleInputKeyPress = ((event) => {
            if (event.key === "Enter") {
                handleAddMessageClick();
            }
        });

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
                    <div className={s.messages} ref={containerRef}>
                        <Messages messageItems={messages} container={containerRef.current}/>
                    </div>
                </messageArea>
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
