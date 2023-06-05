import s from "./ChatArea.module.css"
import { useParams } from "react-router-dom";
import {useCallback, useEffect, useRef, useState} from "react";
import { v4 as createId } from "uuid"
import Messages, { Loader } from "./Messages/Messages";
import {ChatHeader} from "./ChatHeader/ChatHeader";
import {pushMessage} from "../../store/messagesSlice.ts";
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
    const [wsStatus, setwsStatus] = useState(false)

    const params = useParams();

    const containerRef = useRef(null);
    const socket = useRef(null)

    const messageChange = useCallback((event)=>{
        setMessageValue(event.target.value)
    },[])

    const WS_URL = 'ws://127.0.0.1:8084/ws';

    const INITIAL_MESSAGE = {
        "chat_id": params.chatId,
        "sender_id": CURRENT_USER_DATA.user_id, 
        "payload": 'INITIAL_MESSAGE', 
        "session_start": true
    }

    socket.onmessage = function (e) {
        console.log(e.data);
        console.log(JSON.parse(e.data));
    }

    const wsConnect = () => {
        console.log('Try to connect..')
        socket.current = new WebSocket(WS_URL);

        socket.current.onopen = () => {
            console.log('WS connected');
            console.log('WS Initial message',INITIAL_MESSAGE)
            socket.current.send(JSON.stringify(INITIAL_MESSAGE))
            setwsStatus(true);
        }

        socket.current.onclose = () => {
            console.log('WS disconnected');
            setwsStatus(false);
            
            console.log('Try to reconnect..')
            wsConnect();
        }
    }

    useEffect(()=> {
        if (CURRENT_USER_DATA.user_id) {
            wsConnect()
            if (socket.current) {
                gettingMessages()
            }
            
        }
    },[socket,CURRENT_USER_DATA,params.chatId])

    const gettingMessages = useCallback(() => {
        if (!socket.current) return;

        socket.current.onmessage = (e) => {
            console.log('WS message: ', JSON.parse(e.data))
            console.log(e.data);
            dispatch(pushMessage(JSON.parse(e.data)))
        }
    })

    // useEffect(()=> {    
    //     socket.onmessage = (e) => {
    //         console.log('WS message: ', JSON.parse(e.data))
    //         console.log(e.data);
    //         dispatch(pushMessage(JSON.parse(e.data)))
    //     }
    // },[])

    const handleAddMessageClick = useCallback(() => {
        if (!messageValue) {
            return;
        }

        let currentMessage = {
            "chat_id": params.chatId,
            "sender_id": CURRENT_USER_DATA.user_id, 
            "payload": messageValue, 
            "session_start": false
        }

        // dispatch(addMessage(currentMessage))
        socket.current.send(JSON.stringify(currentMessage))
         
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
                        <ChatHeader id={params.chatId} isOnline={wsStatus}/>
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
