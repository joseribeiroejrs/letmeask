import React, { ReactNode } from "react";
import toast from "react-hot-toast";
import { Button } from "../Button";
import { RoomCode } from "../RoomCode";

import LogoImg from "../../assets/images/logo.svg";
import { useHistory, useParams } from "react-router";
import { database } from "../../services/firebase";
import { useRoom } from "../../hooks/useRoom";
import "./styles.scss";

type RoomParams = {
	id: string;
};

type LayoutRoomProps = {
	children?: ReactNode;
	isAdmin?: boolean;
};

export const LayoutRoom = (props: LayoutRoomProps): JSX.Element => {
	const { children, isAdmin = false } = props;
	const history = useHistory();
	const params = useParams<RoomParams>();
	const roomId = params.id;
	const { title, questions } = useRoom(roomId);

	const goToHome = () => {
		history.push("/");
	};

	const renderEndRoomButton = () => {
		if (isAdmin) {
			return (
				<Button isOutlined onClick={handleEndRoom}>
					Encerrar Sala
				</Button>
			);
		}
		return <></>;
	};

	const handleEndRoom = async () => {
		const alertMessage = "Tem certeza que deseja encerrar a sala?";
		if (window.confirm(alertMessage)) {
			const loadToast = toast.loading(`Encerrando sala...`);
			try {
				await database.ref(`rooms/${roomId}`).update({
					endedAt: new Date(),
				});
				history.push("/");
				toast.success(`Sala encerrada com sucesso`);
			} catch (e) {
				toast.error(`Erro ao encerra a sala`);
			} finally {
				toast.dismiss(loadToast);
			}
		}
	};

	return (
		<div id="page-room">
			<header>
				<div className="content">
					<img
						className="logo"
						src={LogoImg}
						alt="Let me ask Logo"
						onClick={goToHome}
					/>
					<div className="header-actions">
						<RoomCode code={roomId} />
						{renderEndRoomButton()}
					</div>
				</div>
			</header>
			<main>
				<div className="room-title">
					<h1>{title}</h1>
					<span>
						{questions?.length} pergunta{questions?.length ? "s" : ""}
					</span>
				</div>
				<>{children}</>
			</main>
		</div>
	);
};
