import ChatItem from "../ChatItem/ChatItem.jsx";
import s from "./ChatBoard.module.css"
import {getChats} from "../../../mocks/serviceMocks.js";
import {useEffect, useState} from "react";

export default function ChatBoard (props) {
    console.log(props.chats)

    //todo create a sceleton
    if (props.chats === null) {
        return <h3>Загрузка информации...</h3>;
    }

    if (props.chats === "no data") {
        return <h3>Нет информации</h3>;
    }

    return (
        <div className={s.board}>
            {
                props.chats.map((element) => {
                    console.log("Имя",element.name)

                    return (
                        <ChatItem
                            avatar={element.avatar}
                            name={element.name}
                            surname={element.surname}
                            lastMessage={element.lastMessage}
                            userId={element.id}
                            key={element.id}
                        />
                    )
                })
            }
        </div>
    );
}
