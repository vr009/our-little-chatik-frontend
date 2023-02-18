import s from "./Header.module.css"
import Button from "../../components/button/Button";
import AuthService from "../../service/AuthService";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setAuth} from "../../store/userSlice";

export default function Header () {

    const navigate = useNavigate()
    const dipatch = useDispatch()

    // const isAuth = useSelector((state) => state.user.isAuth);

    const logoutHandler = () =>{
        alert('logout')
        AuthService.logut()
            .then(() => {
                alert('You have logged out');
                dipatch(setAuth(false))
                navigate('/')
            })
            .catch(e => {
                console.log(e)
            })
    }

    return (
        <div className={s.header}>
            <>
                <div className={s.username}>
                    <p> username  </p>
                </div>
                <div className={s.controls}>
                    <Button
                        onClick={logoutHandler}
                        children={'Log out'}
                    />
                </div>
            </>
        </div>
    )
}
