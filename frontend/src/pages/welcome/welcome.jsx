import s from './welcome.module.css'
import {ButtonLink} from "../../components/button/Button";
import {Link} from "react-router-dom";

export default function Welcome() {
    const heading =  'Привет!';

    function handleclick(url) {
        window.location.assign(url)
    }

    return (
        <>
            <div className={s.main} id="welcome">
                <h1>{heading}</h1>
                <ButtonLink
                    href={'reg'}
                    children={'Регистрация'}
                />
                <ButtonLink
                    href={'auth'}
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
