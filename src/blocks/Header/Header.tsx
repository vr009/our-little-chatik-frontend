import s from "./Header.module.css"
import Button from "../../components/button/Button";
import AuthService from "../../service/AuthService";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setAuth, setUser, whoAmI} from "../../store/userSlice";
import React, { useEffect, useState } from "react";
import api from "../http";
import { LoadingNameSurname } from "../../blocks/ChatList/ChatItem/ChatItem.jsx"
import Picture from "../../components/picture/Picture";
import defaultAvatar from "../../assets/png/default_avatar.png";


export default function Header () {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [userInfo, setUserInfo] = useState({})

    const storedUserInfo = useSelector((state) => state.user.userInfo);

    useEffect(()=>{
        dispatch(whoAmI())
    },[dispatch])

    const logoutHandler = () =>{
        AuthService.logut()
            .then(() => {
                alert('You have logged out');
                dispatch(setAuth(false));
                navigate('/')
            })
            .catch(e => {
                console.log(e)
            })
    }

    return (
        <div className={s.header}>
                <div className={s.username}>
                    {!storedUserInfo && (<LoadingNameSurname/> )}
                    {storedUserInfo &&
                        <>
                            <Picture
                                src={ storedUserInfo.avatar ? storedUserInfo.avatar : defaultAvatar }
                                // alt={props.name}
                                class={s.avatar}
                            />
                            <p>{storedUserInfo.name} {storedUserInfo.surname}</p>
                        </>
                    }
                </div>
                <div className={s.controls}>
                    <Button
                        onClick={logoutHandler}
                        children={'Log out'}
                    />
                </div>
        </div>
    )
}
