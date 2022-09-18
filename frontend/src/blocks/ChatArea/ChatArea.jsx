import s from "./ChatArea.module.css"
import { useParams } from "react-router-dom";
import {useEffect} from "react";



export default function ChatArea() {
    const params = useParams()

    useEffect(()=>{
        console.log("params:", params)
    },[params])

    console.log({params})
    return (
        <>
            <div className={s.main}>
                <h1>Ops!</h1>
                <h2>There should be a chat with userID {params.userId}</h2>
            </div>
        </>
    );
}
