type Props = {
    text: string;
};

export const Message = (props: Props) => {
    return <div className="message">{props.text}</div>;
};
