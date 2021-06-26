import React from "react";
import { database } from "../../../../services/firebase";
import CheckImg from "../../../../assets/images/check.svg";

export type CheckQuestionAsAnsweredType = {
	query: string;
};

export const CheckQuestionAsAnswered = ({
	query,
}: CheckQuestionAsAnsweredType): JSX.Element => {
	const handleCheckQuestionAsAnswered = async () => {
		if (query) {
			await database.ref(query).update({
				isAnswered: true,
			});
		}
	};
	return (
		<button type="button" onClick={() => handleCheckQuestionAsAnswered()}>
			<img src={CheckImg} alt="Marcar pergunta como respondida" />
		</button>
	);
};
