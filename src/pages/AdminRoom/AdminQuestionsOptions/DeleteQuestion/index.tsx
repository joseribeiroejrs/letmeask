import React from "react";
import toast from "react-hot-toast";

import DeleteImg from "../../../../assets/images/delete.svg";
import { database } from "../../../../services/firebase";

export type DeleteQuestionType = {
	query: string;
};

export const DeleteQuestion = ({ query }: DeleteQuestionType): JSX.Element => {
	const handleDeleteQuestion = async () => {
		const alertMessage = "Tem certeza que deseja remover essa pergunta?";
		if (query && window.confirm(alertMessage)) {
			const loadToast = toast.loading(`Removendo pergunta...`);
			try {
				await database.ref(query).remove();
				toast.success(`Sucesso ao remover a pergunta`);
			} catch (e) {
				toast.error(`Erro ao remover a pergunta`);
			} finally {
				toast.dismiss(loadToast);
			}
		}
	};

	return (
		<button type="button" onClick={() => handleDeleteQuestion()}>
			<img src={DeleteImg} alt="Remover pergunta" />
		</button>
	);
};
