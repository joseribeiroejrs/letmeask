import React from "react";
import { useParams } from "react-router-dom";
import { Question } from "../../components/Question";
import { useRoom } from "../../hooks/useRoom";
import { Empty, EmptyType } from "../../components/Empty";
import { LayoutRoom } from "../../components/LayoutRoom";

import { Like } from "./Like";
import { NewQuestionForm } from "./NewQuestionForm";

import "../../styles/room.scss";

type RoomParams = {
	id: string;
};

export const Room = (): JSX.Element => {
	const params = useParams<RoomParams>();
	const roomId = params.id;
	const { questions } = useRoom(roomId);

	const renderEmptyQuestionList = () => {
		const emptyLabels: EmptyType = {
			title: "Nenhuma pergunta por aqui...",
			description:
				"Faça o seu login e seja a primeira pessoa a fazer uma pergunta!",
		};
		return !questions?.length && <Empty {...emptyLabels} />;
	};

	return (
		<LayoutRoom>
			<NewQuestionForm></NewQuestionForm>

			<div className="question-list">
				{questions.map((question) => (
					<Question
						key={question.id}
						content={question.content}
						author={question.author}
						isAnswered={question.isAnswered}
						isHighlighted={question.isHighlighted}
					>
						<Like question={question} />
					</Question>
				))}

				{renderEmptyQuestionList()}
			</div>
		</LayoutRoom>
	);
};
