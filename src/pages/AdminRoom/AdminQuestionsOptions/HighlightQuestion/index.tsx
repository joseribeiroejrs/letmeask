import React from "react";
import { database } from "../../../../services/firebase";

import AnswerImg from "../../../../assets/images/answer.svg";

export type HighlightQuestionType = {
	query: string;
};

export const HighlightQuestion = ({
	query,
}: HighlightQuestionType): JSX.Element => {
	const handleHighlightQuestion = async () => {
		if (query) {
			await database.ref(query).update({
				isHighlighted: true,
			});
		}
	};
	return (
		<button type="button" onClick={() => handleHighlightQuestion()}>
			<img src={AnswerImg} alt="Dar destaque a pergunta" />
		</button>
	);
};
