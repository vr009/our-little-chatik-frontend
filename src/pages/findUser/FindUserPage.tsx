import Input from "../../components/input/Input";
import Button from "../../components/button/Button.jsx";
import ChatItem, {LoadingChatItem} from "../../blocks/ChatList/ChatItem/ChatItem.jsx"
import s from "./FindUserPage.module.css"
import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {searchContacts, setStatus} from "../../store/contactSlice";
import React from "react";
import { setError } from "../../store/userSlice";

export default function FindUserPage (){

    const dispatch = useDispatch();

    // const isModalVisible = useSelector(state => state.modal.isVisible)
    const searchingStatus = useSelector(state => state.contacts.status)

    const [userQuery, setUserQuery] = useState('');

    useEffect(()=> {
        dispatch(setError('null'));
        dispatch(setStatus('null'));
    },[])

    const handleChange = useCallback((event) => {
        setUserQuery(event.target.value)
        // @ts-ignore
        dispatch(searchContacts(event.target.value));


    },[dispatch,userQuery])

    return (
        <div className={s.background}>
            <p className={s.title}>Поиск пользователей</p>
            <div className={s.inputs}>
                <Input
                    value={userQuery}
                    placeholder="Введите имя"
                    onChange={handleChange}
                />
            </div>
            <div className={s.board}>
                { searchingStatus === 'Pending' && 
                    <>
                        <LoadingChatItem/>
                        <LoadingChatItem/>
                        <LoadingChatItem/>
                    </>
                }
                { searchingStatus === 'Error' && 
                    <>
                        <p className={`${s.title} ${s.alert}`}>
                            Ошибка загрузки
                        </p>
                    </>
                }
            </div>
        </div>
    )
}
