import s from "./ChatArea.module.css"
import { useParams } from "react-router-dom";
import {useCallback, useEffect, useRef, useState} from "react";
import { v4 as createId } from "uuid"
import Messages from "./Messages/Messages";
import ChatHeader from "./ChatHeader/ChatHeader";
import {addMessage} from "../../store/messagesSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import Modal from "../../components/modal/Modal.jsx";
import Input from "../../components/input/Input.tsx";
import Button from "../../components/button/Button.jsx";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { io } from "socket.io-client";


const WS_URL = 'ws://127.0.0.1:8084/ws';
const socket = new WebSocket(WS_URL);

export default function ChatArea() {

    const dispatch = useDispatch();

    const [messageValue, setMessageValue] = useState('');


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
        socket.addEventListener('open', (e) => {
            console.log('connected')
        })

        socket.addEventListener('error', (e) => {
            console.log('error: ', e)
        })

        socket.addEventListener('message', (e) => {
            console.log('error: ', e)
        })

        // socket.onopen(()=> {
        //     console.log('connected')
        // })


        return () => {
            socket.close()
            console.log('connection closed')
            // socket.onclose = function(event) {
            //     if (event.wasClean) {
            //       alert('Connection closed without errors');
            //     } else {
            //       alert('Connection closed with error');
            //     }
            //     alert('Code: ' + event.code + ' cause: ' + event.reason);
            //   };
        }

        sendMessage(JSON.stringify(INITIAL_MESSAGE))
        
    },[params.chatId])

    // useEffect(()=> {
    //     socket.send(JSON.stringify(INITIAL_MESSAGE))
    // },[params.chatId])

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
