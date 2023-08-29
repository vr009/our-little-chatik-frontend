import s from './messages.module.css'
import chatIcon from "../../assets/svg/newChat.svg"
import ChatBoard from "../../blocks/ChatList/ChatBoard/ChatBoard";
import { Outlet } from "react-router-dom";
import {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getChats, searchChats} from "../../store/chatListSlice.js";
import Modal from "../../components/modal/Modal.jsx";
import {toggleVisible} from "../../store/modalSlice.js";
import Input from "../../components/input/Input.tsx";
import FindUserPage from "../findUser/FindUserPage.js";
import ChatListService from "../../service/ChatListService.ts";
import {useNavigate} from "react-router";
import Header from "../../blocks/Header/Header";

export default function MessagesPage() {

    const isModalVisible = useSelector(state => state.modal.isVisible)

    const [query, setQuery] = useState('');

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleAddChat = useCallback(()=> {
        dispatch(toggleVisible())
    })

    const handleChange = useCallback((event)=>{
        console.log(event.target.value)
        setQuery(event.target.value)
        dispatch(searchChats(event.target.value))
    },[query])

    useEffect(() => {
        ChatListService.getList()
            // .then(data =>{
            //     console.log('Залогинен')
            //     // console.log(data)
            // })
            .catch(e => {
                // navigate('/')
                console.log(e)
            })
    },[])

    return (
        <>
            <Header/>
            <div className={s.layout}>
                {isModalVisible &&
                    <Modal active={isModalVisible} >
                        <FindUserPage/>
                    </Modal>
                }

                <div className={s.chatlist}>
                    <div className={s.inputs}>
                        <div className={s.сontent}>
                            <Input
                                className={s.messageInput}
                                placeholder="Find chat"
                                value={query}
                                onChange={handleChange}
                            />
                            <div className={s.addIcon} onClick={handleAddChat}>
                                <img src={chatIcon}/>
                            </div>
                        </div>
                    </div>

                    <ChatBoard/>

                </div>
                <div className={s.chatContent}>
                    <div className={s.chatarea}>
                        <Outlet/>
                    </div>
                </div>
            </div>
        </>
    );
}
