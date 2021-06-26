import React from "react";
import { useParams } from "react-router";

import { QuestionType } from "../../../hooks/useRoom";
import { CheckQuestionAsAnswered } from "./CheckQuestionAsAnswered";
import { DeleteQuestion } from "./DeleteQuestion";
import { HighlightQuestion } from "./HighlightQuestion";

export type RoomParams = {
	id: string;
};

export type AdminQuestionOptionsType = {
	question: QuestionType;
};

export const AdminQuestionOptions = ({
	question,
}: AdminQuestionOptionsType): JSX.Element => {
	const params = useParams<RoomParams>();
	const roomId = params.id;

	const getQueryUpdateQuestion = (questionId: string | undefined) => {
		return `rooms/${roomId}/questions/${questionId}`;
	};

	return (
		<>
			{!question.isAnswered && (
				<>
					<CheckQuestionAsAnswered
						query={getQueryUpdateQuestion(question?.id)}
					/>

					<HighlightQuestion query={getQueryUpdateQuestion(question?.id)} />
				</>
			)}

			<DeleteQuestion query={getQueryUpdateQuestion(question?.id)} />
		</>
	);
};
