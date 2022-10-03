import s from "./Message.module.css"

type Props = {
    text: string;
    isMine: boolean;
};

export const Message = (props: Props) => {

    const style = {
        color: props.isMine ? "white" : "black",
        backgroundColor: props.isMine ? "DodgerBlue" : "#fcc521",
        marginLeft: props.isMine ? "auto" : "",
        borderRadius: props.isMine ? "8px 8px 0 8px" : "8px 8px 8px 0",
    };


    return (
        <div className={s.messageLine}>
            <p className={s.messageText} style={style}>{props.text}</p>
        </div>
    )
};
