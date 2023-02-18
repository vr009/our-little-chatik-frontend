import s from './welcome.module.css'
import {ButtonLink} from "../../components/button/Button";
import {Link} from "react-router-dom";
import Modal from "../../components/modal/Modal.jsx";
import {useEffect} from "react";
import ChatListService from "../../service/ChatListService.ts";
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";

export default function Welcome() {

    let navigate = useNavigate();

    const isAuth = useSelector((state) => state.user.isAuth);

    useEffect(() => {
        if (isAuth) {
            navigate('/messages')
        } else {
            ChatListService.getList()
                .then(data => {
                    navigate('/messages')
                })
                .catch(e => {
                    console.log(e)
                })
        }
    })

    return (
        <>
            <div className={s.main}>
                <h1 className={s.heading}>Есть два стула:</h1>
                <div className={s.buttons}>
                    <ButtonLink
                        href={'reg'}
                        children={'Регистрация'}
                    />
                    <ButtonLink
                        href={'login'}
                        children={'Авторизация'}
                    />
                </div>
                {/*<ButtonLink*/}
                {/*    href={'messages'}*/}
                {/*    children={'Сообщения'}*/}
                {/*/>*/}
            </div>
        </>
    );
}
