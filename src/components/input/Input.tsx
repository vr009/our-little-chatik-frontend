import s from "./Input.module.css"
import {MutableRefObject} from "react";
import * as React from "react";

interface IInput extends HTMLInputElement {
}
//todo разобраться с типизацией any
const Input = React.forwardRef<IInput,any>((props,ref) =>{

    return (
        <input
            value={props.value}
            onChange= {props.onChange}
            placeholder={props.placeholder}
            onKeyUp={props.onKeyUp}
            className={s.input}
            ref={ref}
        />
    )
})

export default Input
