import {Message} from "./Message";

const YOUR_ID = "337295eb-cbde-479c-a4ee-683019adc838"

export interface messageItem {
    "ChatID"?: string,
    "SenderID"?: string,
    "MsgID"?: string,
    "Payload"?: string,
    "CreatedAt"?: number,
    "SessionStart"?: boolean
}

export interface messagesProps {
    messageItems: messageItem[],
}

export default function Messages (props) {


    return (
        <>
            {
                props.messageItems.map((message,index) => {
                    return <Message key={index} text={message.Payload} isMine={(message.SenderID === YOUR_ID)} date={message.CreatedAt}/>
                })
            }
        </>
    )
}

