import React from 'react';
import {Link} from "react-router-dom";

import s from './ChatItem.module.css';
import Picture from "../../../components/picture/Picture";

export default function ChatItem(props) {
	return (
			<Link to={`/messages/${props.userId}`} className={s.info}>
				<Picture
					src={props.avatar}
					alt={props.name}
					class={s.logo}
				/>
				<div>
					<div className={s.name}>
						{props.name +" " + props.surname}
					</div>
					<div className={s.message}>
						{props.lastMessage}
					</div>
				</div>
			</Link>
	);
};
