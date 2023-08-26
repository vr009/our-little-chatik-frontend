import React from "react";
import s from './Button.module.css';
import {useNavigate} from "react-router";

const JoinRoom = (props) => {
    const navigate = useNavigate();

    const handler = () => {
        navigate(`/room/${props.chat_id}`);
    }

    return (
        <div>
            <button
                onClick={handler}>Join Room
                className={s.callbutton}
            </button>
        </div>
    );
};

export default JoinRoom;


