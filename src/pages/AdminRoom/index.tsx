import React from "react";
import { useParams } from "react-router-dom";
import { useRoom } from "../../hooks/useRoom";

import { Question } from "../../components/Question";
import { Empty, EmptyType } from "../../components/Empty";
import { LayoutRoom } from "../../components/LayoutRoom";
import { AdminQuestionOptions, RoomParams } from "./AdminQuestionsOptions";

export const AdminRoom = (): JSX.Element => {
	const params = useParams<RoomParams>();
	const roomId = params.id;
	const { questions } = useRoom(roomId);

	const renderEmptyQuestionList = () => {
		const emptyLabels: EmptyType = {
			title: "Nenhuma pergunta por aqui...",
			description:
				"Envie o código desta sala para seus amigos e comece a responder perguntas!",
		};
		return !questions?.length && <Empty {...emptyLabels} />;
	};

	return (
		<LayoutRoom isAdmin>
			<div className="question-list">
				{questions.map((question) => (
					<Question
						key={question.id}
						content={question.content}
						author={question.author}
						isAnswered={question.isAnswered}
						isHighlighted={question.isHighlighted}
					>
						<AdminQuestionOptions question={question}></AdminQuestionOptions>
					</Question>
				))}

				{renderEmptyQuestionList()}
			</div>
		</LayoutRoom>
	);
};
