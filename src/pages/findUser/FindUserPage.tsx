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
    const searchingResult = useSelector(state => state.contacts.contacts)
    const searchingStatus = useSelector(state => state.contacts.status);

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
            <p className={s.title}>Find user by his name</p>
            <div className={s.inputs}>
                <Input
                    value={userQuery}
                    placeholder="Type friend`s name"
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
                        <p className={`${s.contextual} ${s.alert}`}>
                            Something went wrong!
                        </p>
                    </>
                }
                { searchingStatus === 'NotFound' && 
                    <>
                        <p className={`${s.contextual}`}>
                            We are sorry, we don`t know them
                            <br/>
                            <br/>
                            <strong>¯\_(ツ)_/¯</strong>
                        </p>
                    </>
                }
                { searchingStatus === 'Fulfilled' && 
                    searchingResult && 
                        searchingResult.map((element) => (
                            <ChatItem
                                avatar={element.avatar}
                                name={element.name}
                                surname={element.surname}
                                userId={element.user_id}
                                lastOnline={element.last_auth}
                                key={element.id}
                            />
                        ))
                }
            </div>
        </div>
    )
}
