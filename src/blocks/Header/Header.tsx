import s from "./Header.module.css"
import Button from "../../components/button/Button";
import AuthService from "../../service/AuthService";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setAuth} from "../../store/userSlice";
import React, { useEffect, useState } from "react";
import api from "../http";
import { LoadingNameSurname } from "../../blocks/ChatList/ChatItem/ChatItem.jsx"

export default function Header () {

    const navigate = useNavigate()
    const dipatch = useDispatch()

    const [user, setUser] = useState({})

    // const isAuth = useSelector((state) => state.user.isAuth);

    useEffect(()=>{
        AuthService.whoAmI()
            .then((res) => {
                console.log("Текущий юзер: ",res.data);
                setUser({name: res.data.name, surname: res.data.surname});
            })
            .catch((e) => {
                console.log(e);
                setTimeout(()=>{
                    setUser({name: 'Не получилось загрузить данные о пользователе'});
                }, 1000)
            })
    },[])

    const logoutHandler = () =>{
        AuthService.logut()
            .then(() => {
                alert('You have logged out');
                dipatch(setAuth(false));
                navigate('/')
            })
            .catch(e => {
                console.log(e)
            })
    }

    return (
        <div className={s.header}>
                <div className={s.username}>
                    {!user && <LoadingNameSurname/>}
                    {user && <p>{user.name} {user.surname}</p>}
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
