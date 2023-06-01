import s from "./ChatArea.module.css"
import { useParams } from "react-router-dom";
import {useCallback, useEffect, useRef, useState} from "react";
import { v4 as createId } from "uuid"
import Messages from "./Messages/Messages";
import ChatHeader from "./ChatHeader/ChatHeader";
import {addMessage} from "../../store/messagesSlice.js";
import {useDispatch, useSelector} from "react-redux";
import Modal from "../../components/modal/Modal.jsx";
import Input from "../../components/input/Input.tsx";
import Button from "../../components/button/Button.jsx";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";

export default function ChatArea() {

    const dispatch = useDispatch();

    const [messageValue, setMessageValue] = useState('');

    const [socketUrl, setSocketUrl] = useState('ws://127.0.0.1:8084/ws');

    const { sendMessage, lastMessage, readyState} = useWebSocket(socketUrl)

    const YOUR_ID = useSelector((state) => state.user.userInfo.user_id);

    const params = useParams();

    const containerRef = useRef(null);

    const messageChange = useCallback((event)=>{
        setMessageValue(event.target.value)
    },[])


    const INITIAL_MESSAGE = {
        "chatID": params.chatId,
        "senderID": YOUR_ID, 
        "payload": 'INITIAL_MESSAGE', 
        "SessionStart": true
    }


    useEffect(()=> {
        console.log('Параметры: ', params);
        sendMessage(INITIAL_MESSAGE)
    },[])

    const handleAddMessageClick = useCallback(() => {
        if (!messageValue) {
            return;
        }

        let currentMessage = {
            "chatID": params.chatId,
            "senderID": YOUR_ID, 
            "payload": messageValue, 
            "SessionStart": false
        }

        // dispatch(addMessage(currentMessage))
        sendMessage(currentMessage)
         
        console.log(currentMessage)

        setMessageValue('');

    }, [messageValue]);


    const handleInputKeyPress = ((event) => {
            if (event.key === "Enter") {
                handleAddMessageClick();
            }
        });


        //TODO поправить userID на chatID

    return (
        <>
            <div className={s.main}>
                <ChatHeader id={params.chatId}/>
                <div className={s.messages} ref={containerRef}>
                    <Messages
                            chatId={params.chatId}
                            container={containerRef.current}
                        />
                </div>
                <div className={s.inputs}>
                    <Input
                        value={messageValue}
                        onChange={messageChange}
                        placeholder="Type your message"
                        onKeyUp={handleInputKeyPress}
                    />
                    <Button className={s.button} onClick={handleAddMessageClick}>
                        Send
                    </Button>
                </div>
            </div>
        </>
    );
}
