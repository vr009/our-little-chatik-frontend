import s from './welcome.module.css'
import {ButtonLink} from "../../components/button/Button";
import {Link} from "react-router-dom";
import Modal from "../../components/modal/Modal.jsx";
import {useEffect} from "react";
import ChatListService from "../../service/ChatListService.ts";
import {useNavigate} from "react-router";

export default function Welcome() {
    const heading =  'Привет!';

    let navigate = useNavigate();

    useEffect(() => {
        ChatListService.getList()
            .then(data =>{
                navigate('/messages')
            })
            .catch(e => {
                console.log(e)
            })
    })

    return (
        <>
            <div className={s.main} id="welcome">
                {/*<Modal*/}
                {/*    active={true}*/}
                {/*    children={*/}
                {/*        <h1 className={s.heading}>{heading}</h1>*/}
                {/*    }*/}
                {/*/>*/}
                {/*<h1 className={s.heading}>{heading}</h1>*/}
                <ButtonLink
                    href={'reg'}
                    children={'Регистрация'}
                />
                <ButtonLink
                    href={'login'}
                    children={'Авторизация'}
                />
                <ButtonLink
                    href={'messages'}
                    children={'Сообщения'}
                />
            </div>
        </>
    );
}
