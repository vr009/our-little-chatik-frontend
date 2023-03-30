import React from 'react';
import {Link, useNavigate} from "react-router-dom";

import s from './ChatItem.module.css';
import Picture from "../../../components/picture/Picture";
import {Skeleton} from "../../../components/sceleton/Sceleton";
import ChatListService from '../../../service/ChatListService';
import { useDispatch } from 'react-redux';
import { toggleVisible } from '../../../store/modalSlice';

export const LoadingNameSurname = () => {
	return (
		<div className={`${s.name} ${s.loading}`}>
			<Skeleton/>
			<Skeleton/>
		</div>
	)
}

export const LoadingChatItem = () => {
	return(
		<div className={s.info}>
			<div className={s.avatar}>
				<Skeleton/>
			</div>
			<div>
				<LoadingNameSurname/>
				<div className={`${s.message} ${s.loading}`}>
					<Skeleton/>
				</div>
			</div>
		</div>
	)
}

export default function ChatItem(props) {

	const dispatch = useDispatch()

	const navigate = useNavigate();

	const handler = () => {
		if (props.type === "Chatboard") {
			console.log("Chatboard");
			navigate(`/messages/${props.userId}`)
		} else {
			console.log('закрываем')
			ChatListService.addChat([props.userId]);
			dispatch(toggleVisible());
			navigate(`/messages/${props.userId}`)
		}
	}

	return (
		<>
		{/*(props.type === "Chatboard" && "ff")*/}
			{/* <Link to={`/messages/${props.userId}`} className={s.info} onClick={handler}> */}
			<div onClick={handler} className={s.info}>
				<Picture
					src={props.avatar}
					// alt={props.name}
					class={s.avatar}
				/>
				<div className={s.userData}>
					<div className={s.name}>
						{props.name +" " + props.surname}
					</div>
					{props.lastOnline && 
						<div className={s.lastOnline}>
							Last online on {new Date(props.lastOnline).toDateString()}
						</div>
					}
					{props.lastMessage && 
						<div className={s.message}>
						{	props.lastMessage}
						</div>
					}
				</div>
			</div>
			{/* </Link> */}
		</>
	);
};
