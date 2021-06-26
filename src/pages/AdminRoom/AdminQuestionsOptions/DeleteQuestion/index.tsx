import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";

import DeleteImg from "../../../../assets/images/delete.svg";
import { Modal } from "../../../../components/Modal";
import { database } from "../../../../services/firebase";

export type DeleteQuestionType = {
	query: string;
};

export const DeleteQuestion = ({ query }: DeleteQuestionType): JSX.Element => {
	const [isOpenModal, setIsOpenModal] = useState(false);

	const handleDeleteQuestion = async () => {
		if (query) {
			const loadToast = toast.loading(`Removendo pergunta...`);
			try {
				await database.ref(query).remove();
				toast.success(`Sucesso ao remover a pergunta`);
			} catch (e) {
				toast.error(`Erro ao remover a pergunta`);
			} finally {
				toast.dismiss(loadToast);
				setIsOpenModal(false);
			}
		}
	};

	return (
		<>
			<button type="button" onClick={() => setIsOpenModal(true)}>
				<img src={DeleteImg} alt="Remover pergunta" />
			</button>
			<Modal
				isOpen={isOpenModal}
				onClose={() => setIsOpenModal(false)}
				confirmEvent={() => handleDeleteQuestion()}
				title="Excluir Pergunta"
				description="Tem certeza que você deseja excluir essa pergunta?"
				primaryButtonLabel="Sim, excluir"
			></Modal>
		</>
	);
};
