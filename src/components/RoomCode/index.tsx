import React from "react";
import CopyImg from "../../assets/images/copy.svg";
import toast from "react-hot-toast";
import "./styles.scss";

type RoomCodeProps = {
	code: string;
};

export const RoomCode = (props: RoomCodeProps): JSX.Element => {
	const { code } = props;
	const copyRoomCode = () => {
		navigator.clipboard.writeText(code);
		toast.success(`Código da sala copiado com sucesso`);
	};

	return (
		<button className="room-code" onClick={copyRoomCode}>
			<div>
				<img src={CopyImg} alt="Copy room code" />
			</div>
			<span>Sala {code}</span>
		</button>
	);
};
