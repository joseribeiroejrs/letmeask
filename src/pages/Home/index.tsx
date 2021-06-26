import React, { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";

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
		const loadingToast = toast.loading(`Aguarde enquanto te identificamos...`);
		try {
			if (!user) {
				await signInWithGoogle();
			}
			toast(`Bom te ver de novo ${user?.name}!`);
			history.push("/rooms/new");
		} catch (e) {
			toast.dismiss(loadingToast);
			toast.error("Erro ao realizar login");
		} finally {
			toast.dismiss(loadingToast);
		}
	};

	const handleJoinRoom = async (event: FormEvent) => {
		const loadingToast = toast.loading(`Procurando sala...`);
		try {
			event.preventDefault();
			if (roomCode.trim() === "") {
				return;
			}

			const roomRef = await database.ref(`rooms/${roomCode}`).get();

			if (!roomRef.exists()) {
				toast.error(`A sala não existe`);
				return;
			}

			if (roomRef.val().endedAt) {
				toast.error(`A sala já foi fechada`);
				return;
			}

			toast.success(`Seja bem-vindo a sala`);
			history.push(`/rooms/${roomCode}`);
		} catch (e) {
			toast.error(`Ops, ocorreu um erro ao procurar pela sala`);
		} finally {
			toast.dismiss(loadingToast);
		}
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
