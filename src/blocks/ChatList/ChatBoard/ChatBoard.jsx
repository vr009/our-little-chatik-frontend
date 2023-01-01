import ChatItem from "../ChatItem/ChatItem.jsx";
import s from "./ChatBoard.module.css"


export default function ChatBoard (props) {

    return (
        <div className={s.board}>
            {
                props.chats.map((element) => {
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
