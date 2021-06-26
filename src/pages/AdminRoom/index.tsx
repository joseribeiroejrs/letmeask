import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useRoom } from "../../hooks/useRoom";

import { Button } from "../../components/Button";
import { Question } from "../../components/Question";
import { RoomCode } from "../../components/RoomCode";

import LogoImg from "../../assets/images/logo.svg";
import DeleteImg from "../../assets/images/delete.svg";
import CheckImg from "../../assets/images/check.svg";
import AnswerImg from "../../assets/images/answer.svg";

import { database } from "../../services/firebase";

import "../../styles/room.scss";
// import { useEffect } from "react";
// import { useAuth } from "../../hooks/useAuth";
import { Empty, EmptyType } from "../../components/Empty";

type RoomParams = {
	id: string;
};

export const AdminRoom = (): JSX.Element => {
	// const { user } = useAuth();
	const history = useHistory();
	const params = useParams<RoomParams>();
	const roomId = params.id;
	const { title, questions } = useRoom(roomId);

	const emptyLabels: EmptyType = {
		title: "Nenhuma pergunta por aqui...",
		description:
			"Envie o código desta sala para seus amigos e comece a responder perguntas!",
	};

	// useEffect(() => {
	// 	if (!user) {
	// 		// throw new Error("You must be logged in ");
	// 		alert("You must be logged in ");
	// 		goToHome();
	// 	}
	// }, [user]);

	const goToHome = () => {
		history.push("/");
	};

	const handleEndRoom = async () => {
		const alertMessage = "Tem certeza que deseja encerrar a sala?";
		if (window.confirm(alertMessage)) {
			await database.ref(`rooms/${roomId}`).update({
				endedAt: new Date(),
			});
			history.push("/");
		}
	};

	const getQueryUpdateQuestion = (questionId: string) => {
		return `rooms/${roomId}/questions/${questionId}`;
	};

	const handleCheckQuestionAsAnswered = async (
		questionId: string | undefined
	) => {
		if (questionId) {
			await database.ref(getQueryUpdateQuestion(questionId)).update({
				isAnswered: true,
			});
		}
	};

	const handleHighlightQuestion = async (questionId: string | undefined) => {
		if (questionId) {
			await database.ref(getQueryUpdateQuestion(questionId)).update({
				isHighlighted: true,
			});
		}
	};

	const handleDeleteQuestion = async (questionId: string | undefined) => {
		const alertMessage = "Tem certeza que deseja remover essa pergunta?";
		if (questionId && window.confirm(alertMessage)) {
			await database.ref(getQueryUpdateQuestion(questionId)).remove();
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
					<div>
						<RoomCode code={roomId} />
						<Button isOutlined onClick={handleEndRoom}>
							Encerrar Sala
						</Button>
					</div>
				</div>
			</header>
			<main>
				<div className="room-title">
					<h1>Sala {title}</h1>
					<span>
						{questions?.length} pergunta{questions?.length ? "s" : ""}
					</span>
				</div>

				<div className="question-list">
					{questions.map((question) => (
						<Question
							key={question.id}
							content={question.content}
							author={question.author}
							isAnswered={question.isAnswered}
							isHighlighted={question.isHighlighted}
						>
							{!question.isAnswered && (
								<>
									<button
										type="button"
										onClick={() => handleCheckQuestionAsAnswered(question?.id)}
									>
										<img src={CheckImg} alt="Marcar pergunta como respondida" />
									</button>

									<button
										type="button"
										onClick={() => handleHighlightQuestion(question?.id)}
									>
										<img src={AnswerImg} alt="Dar destaque a pergunta" />
									</button>
								</>
							)}

							<button
								type="button"
								onClick={() => handleDeleteQuestion(question?.id)}
							>
								<img src={DeleteImg} alt="Remover pergunta" />
							</button>
						</Question>
					))}

					{!questions?.length && <Empty {...emptyLabels} />}
				</div>
			</main>
		</div>
	);
};
