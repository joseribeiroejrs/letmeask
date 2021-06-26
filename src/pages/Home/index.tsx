import React, { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import LogoImg from "../../assets/images/logo.svg";
import GoogleIconImg from "../../assets/images/google-icon.svg";
import { Button } from "../../components/Button";
import "./styles.scss";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";
import { AsideWelcomePage } from "../../components/AsideWelcomePage";

export const Home = (): JSX.Element => {
	const history = useHistory();
	const { user, signInWithGoogle } = useAuth();
	const [roomCode, setRoomCode] = useState("");

	const handleCreateRoom = async () => {
		if (!user) {
			await signInWithGoogle();
		}
		history.push("/rooms/new");
	};

	const handleJoinRoom = async (event: FormEvent) => {
		event.preventDefault();
		if (roomCode.trim() === "") {
			return;
		}
		const roomRef = await database.ref(`rooms/${roomCode}`).get();

		if (!roomRef.exists()) {
			alert("Room does not exists.");
			return;
		}

		if (roomRef.val().endedAt) {
			alert("Room already closed.");
			return;
		}

		history.push(`/rooms/${roomCode}`);
	};

	return (
		<AsideWelcomePage>
			<div className="main-content">
				<img src={LogoImg} alt="Let me ask" />
				<button className="create-room" onClick={handleCreateRoom}>
					<img src={GoogleIconImg} alt="Logo do Google" />
					Crie sua sala com o Google
				</button>
				<div className="separator">ou entre em uma sala</div>
				<form onSubmit={(event) => handleJoinRoom(event)}>
					<input
						type="text"
						placeholder="Digite o código da sala"
						onChange={(event) => setRoomCode(event.target.value)}
					/>
					<Button type="submit">Entrar na sala</Button>
				</form>
			</div>
		</AsideWelcomePage>
	);
};
