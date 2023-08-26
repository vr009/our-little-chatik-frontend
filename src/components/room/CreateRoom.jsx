import React from "react";
import s from './Button.module.css';

const CreateRoom = (props) => {
    const create = async (e) => {
        e.preventDefault();

        const resp = await fetch("http://localhost:8090/create?chat_id="+props.chatID);
        const { room_id } = await resp.json();

		props.history.push(`/room/${room_id}`)
    };

    return (
        <div>
            <button
                onClick={create}>Create Room
                className={s.callbutton}
            </button>
        </div>
    );
};

export default CreateRoom;
