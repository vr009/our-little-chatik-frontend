import React from "react";
import s from './Button.module.css';
import {useNavigate} from "react-router";

const CreateRoom = (props) => {
    const create = async (e) => {
        e.preventDefault();

        const resp = await fetch("http://localhost:8090/create?chat_id="+props.chatId);
        const { room_id } = await resp.json();
        console.log('HERE', room_id)
		// props.history.push(`/room/${room_id}`)
        navigate(`/room/${room_id}`);
    };

    return (
        <div>
            <button
                className={s.callbutton}
                onClick={create}>Create Room
            </button>
        </div>
    );
};

export default CreateRoom;
