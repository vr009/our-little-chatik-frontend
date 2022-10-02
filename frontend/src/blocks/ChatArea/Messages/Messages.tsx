import {Message} from "./Message";

export interface messageItem {
    "ChatID"?: string,
    "SenderID"?: string,
    "MsgID"?: string,
    "Payload"?: string,
    "CreatedAt"?: Date,
    "SessionStart"?: boolean
}

export interface messagesProps {
    messageItems: messageItem[],
}

export default function Messages (props) {

    if (props.messageItems === null) {
        return <h3 >Загрузка информации...</h3>;
    }

    if (props.messageItems.length === 0) {
        return <h3 >Сообщений пока нет :( </h3>;
    } else

    return (
        <>
            {
                props.messageItems.map((message,index) => {
                    return <Message key={index} text={message.Payload}/>
                })
            }
        </>
    )
}

