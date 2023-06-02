import s from "./ChatArea.module.css"
import { useParams } from "react-router-dom";
import {useCallback, useEffect, useRef, useState} from "react";
import { v4 as createId } from "uuid"
import Messages, { Loader } from "./Messages/Messages";
import { socket } from "../../pages/messages/MessagesPage";
import ChatHeader from "./ChatHeader/ChatHeader";
import {addMessage, pushMessage} from "../../store/messagesSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import Modal from "../../components/modal/Modal.jsx";
import Input from "../../components/input/Input.tsx";
import Button from "../../components/button/Button.jsx";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { io } from "socket.io-client";
import store from "../../store";


export default function ChatArea() {

    const CURRENT_USER_DATA = useSelector((state) => state.user.userInfo);

    const dispatch = useDispatch();

    const [messageValue, setMessageValue] = useState('');

    const params = useParams();

    const containerRef = useRef(null);

    const messageChange = useCallback((event)=>{
        setMessageValue(event.target.value)
    },[])


    const INITIAL_MESSAGE = {
        "chatID": params.chatId,
        "senderID": CURRENT_USER_DATA.user_id, 
        "payload": 'INITIAL_MESSAGE', 
        "SessionStart": true
    }

    useEffect(()=> {    
        socket.onmessage = (e) => {
            console.log('WS message: ', JSON.parse(e.data))
            dispatch(pushMessage(e.data))
        }
    },[])

    useEffect(()=> {
        if (CURRENT_USER_DATA.user_id && socket.readyState === 1) {
            console.log('WS Initial message',INITIAL_MESSAGE)
            socket.send(JSON.stringify(INITIAL_MESSAGE))
        }
    },[CURRENT_USER_DATA,params.chatId,socket.readyState])

    const handleAddMessageClick = useCallback(() => {
        if (!messageValue) {
            return;
        }

        let currentMessage = {
            "chatID": params.chatId,
            "senderID": CURRENT_USER_DATA.user_id, 
            "payload": messageValue, 
            "SessionStart": false
        }

        // dispatch(addMessage(currentMessage))
        socket.send(JSON.stringify(currentMessage))
         
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
                {
                    ((!CURRENT_USER_DATA) && <Loader/>)
                }
                {
                    ((CURRENT_USER_DATA) &&
                    <>
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
                    </>
                    )
                }
            </div>
        </>
    );
}
