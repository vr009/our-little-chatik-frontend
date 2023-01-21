import Input from "../../components/input/Input";
import Button from "../../components/button/Button.jsx";
import ChatItem, {LoadingChatItem} from "../../blocks/ChatList/ChatItem/ChatItem.jsx"
import s from "./FindUserPage.module.css"
import {useCallback, useState} from "react";
import {useDispatch} from "react-redux";

export default function FindUserPage (){

    // const dispatch = useDispatch();

    const [userQuery, setUserQuery] = useState('');

    const handleChange = useCallback((event) => {
        setUserQuery(event.target.value)

        // тут добавляем логику для поиска через debounce
        // dispatch(getUsers(userQuery))
    },[])

    return (
        <>
            <div className={s.inputs}>
                <Input
                    value={userQuery}
                    placeholder="Найти пользователя"
                    onChange={handleChange}
                />
                {/*<Button>*/}
                {/*    Поиск*/}
                {/*</Button>*/}
            </div>
            <div className={s.board}>
                <LoadingChatItem/>
                <LoadingChatItem/>
                <LoadingChatItem/>
                <LoadingChatItem/>
                <LoadingChatItem/>
                <LoadingChatItem/>
                <LoadingChatItem/>
                <LoadingChatItem/>
                <LoadingChatItem/>
                <LoadingChatItem/>
            </div>
        </>
    )
}
