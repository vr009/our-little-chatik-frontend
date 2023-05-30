import s from './root.module.css'
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import Button from "../../components/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {setError, login, signup} from "../../store/userSlice.ts";
import ChatListService from "../../service/ChatListService.ts";

const FormPage = (props) => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const isAuth = useSelector((state) => state.user.isAuth);
    const error = useSelector((state) => state.user.error);

    useEffect(()=>{
            if (isAuth) {
                navigate('/messages')
            }
    })

    useEffect(()=>{
            dispatch(setError(false))
    },[])

    useEffect(()=>{
        dispatch(setError(false))
        if (isAuth) {
            navigate('/messages')
        }
    },[navigate])

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [password, setPassword] = useState('')
    const [nickname, setNickname] = useState('')

    function handleChange (setFunction,event) {
        event.preventDefault()
        setFunction(event.target.value)
    }

    function handleSubmit (event) {
        event.preventDefault()
        if (!props.isRegistration) {
            dispatch(login({
                nickname: nickname,
                password: password
            }))
        } else {
            dispatch(signup({
                nickname: nickname,
                password: password,
                name: name,
                surname: surname
            }))
        }
    }

    function renderError (errCode) {
        switch (error) {
            case 404 :
                return "Invalid nickname";
                break;
            case 500 :
                return "Invalid password";
                break;
            case 400 :
                return "User already exists";
                break;
            default :
                return `Unexpected error: ${errCode}`
        }
    }

    const heading =  (props.isRegistration) ? 'Sign up' : 'Log in';
    
    return (
        <>
            <div className={s.main} id="welcome">
                <h1 className={s.heading}>{heading}</h1>
                <form id="welcome-form" onSubmit={handleSubmit}>

                    <input
                        placeholder="Your nickname"
                        type="text"
                        onChange={(e) => handleChange(setNickname,e)}
                    />

                    {props.isRegistration && (
                        <>
                            <input
                                placeholder="Your name"
                                type="text"
                                onChange={(e) => handleChange(setName,e)}
                            />
                            <input
                                placeholder="Your surname"
                                type="text"
                                onChange={(e) => handleChange(setSurname,e)}
                            />
                        </>
                    )}

                    <input
                        placeholder="Password"
                        type="password"
                        onChange={(e) => handleChange(setPassword,e)}
                    />
                    <div className={`${s.alert} ${ !error ? s.disabled : ''}`}>
                        <p>{renderError(error)}</p>
                    </div>
                    <Button>
                        {props.isRegistration ? "Sign up" : "Log in" }
                    </Button>
                    <div className={s.additional}>
                        {props.isRegistration && (
                            <> Already have an account? <a onClick={()=>{navigate('/login')}}> Log in </a> </>
                        )}
                        {!props.isRegistration && (
                            <> Have not got an account? <a onClick={()=>{navigate('/reg')}}> Sign up </a> </>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
}

export default FormPage
