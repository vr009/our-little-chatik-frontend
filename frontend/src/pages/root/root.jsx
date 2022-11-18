import s from './root.module.css'
import Button from "../../components/button/Button";
import {useEffect, useState} from "react";
import {fetchFunc} from "../../utils/utils.ts";

export default function Root(props) {

    const [nickname, setNickname] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    function handleChange (setFunction,event) {
        event.preventDefault()
        setFunction(event.target.value)
        console.log(event.target.value)
    }


    // function handleSubmit (event) {
    //     event.preventDefault()
    //     fetch('http://localhost:8086/api/v1/user/new', {
    //         method: "POST",
    //         body: JSON.stringify({
    //             nickname: nickname,
    //             password: password
    //         })
    //     })
    //         .then(res => {
    //             if (!res.ok) throw Error(res.statusText);
    //             return res.json();
    //         })
    //         .then(data => console.log(data))
    //         .catch(error => console.log(error));
    // }

    function handleSubmit (event) {
        event.preventDefault()
        let body = JSON.stringify({
            nickname: nickname,
            password: password
        })
        fetchFunc('http://localhost:8086/api/v1/user/new',"POST", body)
        console.log(nickname,';',password,';',email)
    }

    const heading =  (props.isNew) ? 'Привет, зарегистрированный пользователь' :  'Привет, новый пользователь';
    return (
        <>
            <div className={s.main} id="welcome">
                <h1>{heading}</h1>
                <div className={s.form}>
                    <form id="welcome-form" onSubmit={handleSubmit}>
                        <input
                            placeholder="Nickname"
                            type="text"
                            onChange={(e) => handleChange(setNickname,e)}
                        />

                        {!props.isNew && (
                            <input
                                placeholder="Your email"
                                type="email"
                                onChange={(e) => handleChange(setEmail,e)}
                            />
                        )}

                        <input
                            placeholder="Password"
                            type="password"
                            onChange={(e) => handleChange(setPassword,e)}
                        />

                        <button
                            type="submit"
                        >
                            {!props.isNew && (
                                "Sign in"
                            )}
                            {props.isNew && (
                                "Log in"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
