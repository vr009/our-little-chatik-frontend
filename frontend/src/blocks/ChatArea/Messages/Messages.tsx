import {Message} from "./Message";
import {useEffect} from "react";
import {scrollToBottom} from "../../../utils/utils";

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
    container: HTMLDivElement | null;
}

export default function Messages (props: messagesProps) {

    const { messageItems, container } = props;

    useEffect(() => {
        scrollToBottom(container)
    }, [container, messageItems]);

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

