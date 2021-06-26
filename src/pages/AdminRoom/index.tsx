import React from "react";
import { useParams } from "react-router-dom";
import { useRoom } from "../../hooks/useRoom";

import { Question } from "../../components/Question";

import DeleteImg from "../../assets/images/delete.svg";
import CheckImg from "../../assets/images/check.svg";
import AnswerImg from "../../assets/images/answer.svg";

import { database } from "../../services/firebase";
import { Empty, EmptyType } from "../../components/Empty";
import { LayoutRoom } from "../../components/LayoutRoom";

type RoomParams = {
	id: string;
};

export const AdminRoom = (): JSX.Element => {
	const params = useParams<RoomParams>();
	const roomId = params.id;

	const { questions } = useRoom(roomId);

	const emptyLabels: EmptyType = {
		title: "Nenhuma pergunta por aqui...",
		description:
			"Envie o código desta sala para seus amigos e comece a responder perguntas!",
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
		<LayoutRoom>
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
		</LayoutRoom>
	);
};
