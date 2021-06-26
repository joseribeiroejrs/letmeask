import React from "react";
import { database } from "../../../../services/firebase";

import AnswerImg from "../../../../assets/images/answer.svg";
import toast from "react-hot-toast";

export type HighlightQuestionType = {
	query: string;
};

export const HighlightQuestion = ({
	query,
}: HighlightQuestionType): JSX.Element => {
	const handleHighlightQuestion = async () => {
		const loadToast = toast.loading(`Destacando pergunta...`);
		try {
			if (query) {
				await database.ref(query).update({
					isHighlighted: true,
				});
			}
			toast.success(`Sucesso ao destacar a pergunta`);
		} catch (e) {
			toast.error(`Ocorreu um erro ao destacar a pergunta`);
		} finally {
			toast.dismiss(loadToast);
		}
	};
	return (
		<button type="button" onClick={() => handleHighlightQuestion()}>
			<img src={AnswerImg} alt="Dar destaque a pergunta" />
		</button>
	);
};
