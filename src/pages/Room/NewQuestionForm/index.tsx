import React, { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Button } from "../../../components/Button";
import { UserType } from "../../../contexts/AuthContext";
import { useAuth } from "../../../hooks/useAuth";
import { database } from "../../../services/firebase";
import { RoomParams } from "../../AdminRoom/AdminQuestionsOptions";

// TODO: REACT MODAL TAMBEM
export const NewQuestionForm = (): JSX.Element => {
	const { user } = useAuth();
	const params = useParams<RoomParams>();
	const roomId = params.id;
	const [newQuestion, setNewQuestion] = useState("");

	const handleNewQuestionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setNewQuestion(event.target.value);
	};

	const getRequestPayload = (content: string, user: UserType) => {
		const { name, avatar } = user;

		return {
			content,
			author: {
				name,
				avatar,
			},
			isHighlighted: false,
			isAnswered: false,
		};
	};

	const handleSendQuestion = async (event: FormEvent) => {
		const loadToast = toast.loading(`Enviando pergunta...`);
		try {
			event.preventDefault();

			if (newQuestion.trim() === "") {
				return;
			}

			if (!user) {
				throw new Error("You must be logged in ");
			}
			const question = getRequestPayload(newQuestion, user);
			await database.ref(`rooms/${roomId}/questions`).push(question);
			setNewQuestion("");
			toast.success(`Sucesso ao enviar a pergunta`);
		} catch (e) {
			toast.error(`Erro ao enviar a pergunta`);
		} finally {
			toast.dismiss(loadToast);
		}
	};

	return (
		<form onSubmit={(event) => handleSendQuestion(event)}>
			<textarea
				placeholder="O que você quer perguntar?"
				onChange={handleNewQuestionChange}
			></textarea>
			<div className="form-footer">
				{user ? (
					<div className="user-info">
						<img src={user?.avatar} alt={user?.name} />
						<span>{user?.name}</span>
					</div>
				) : (
					<span>
						Para enviar uma pergunta, <button>faça seu login</button>.
					</span>
				)}

				<Button type="submit" disabled={!user}>
					Enviar pergunta
				</Button>
			</div>
		</form>
	);
};
