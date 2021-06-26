import React, { useState, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import LogoImg from "../../assets/images/logo.svg";
import { AsideWelcomePage } from "../../components/AsideWelcomePage";
import { Button } from "../../components/Button";

import { useAuth } from "../../hooks/useAuth";

import { database } from "../../services/firebase";

import "../Home/styles.scss";
import "./styles.scss";

export const NewRoom = (): JSX.Element => {
	const [newRoom, setNewRoom] = useState("");
	const { user } = useAuth();
	const history = useHistory();

	const handleCreateRoom = async (event: FormEvent) => {
		event.preventDefault();

		if (newRoom.trim() === "") {
			return;
		}

		const roomRef = database.ref("rooms");
		const firebaseRoom = await roomRef.push({
			title: newRoom,
			authorId: user?.id,
		});

		history.push(`/admin/rooms/${firebaseRoom.key}`);
		console.log(newRoom);
	};

	return (
		<AsideWelcomePage>
			<div className="main-content">
				<img src={LogoImg} alt="Let me ask" />
				<div className="user-info">
					<img src={user?.avatar} alt={user?.name} />
					<h1>{user?.name}</h1>
				</div>
				<h2>Criar uma nova sala</h2>
				<form onSubmit={(event) => handleCreateRoom(event)}>
					<input
						type="text"
						placeholder="Nome da sala"
						onChange={(event) => setNewRoom(event.target.value)}
					/>
					<Button type="submit">Criar sala</Button>
				</form>
				<p>
					Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
				</p>
			</div>
		</AsideWelcomePage>
	);
};
