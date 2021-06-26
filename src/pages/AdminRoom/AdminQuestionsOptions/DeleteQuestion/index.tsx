import React from "react";

import DeleteImg from "../../../../assets/images/delete.svg";
import { database } from "../../../../services/firebase";

export type DeleteQuestionType = {
	query: string;
};

export const DeleteQuestion = ({ query }: DeleteQuestionType): JSX.Element => {
	const handleDeleteQuestion = async () => {
		const alertMessage = "Tem certeza que deseja remover essa pergunta?";
		if (query && window.confirm(alertMessage)) {
			await database.ref(query).remove();
		}
	};

	return (
		<button type="button" onClick={() => handleDeleteQuestion()}>
			<img src={DeleteImg} alt="Remover pergunta" />
		</button>
	);
};
