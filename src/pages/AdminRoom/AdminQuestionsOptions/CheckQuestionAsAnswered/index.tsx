import React from "react";
import { database } from "../../../../services/firebase";
import CheckImg from "../../../../assets/images/check.svg";
import toast from "react-hot-toast";

export type CheckQuestionAsAnsweredType = {
	query: string;
};

export const CheckQuestionAsAnswered = ({
	query,
}: CheckQuestionAsAnsweredType): JSX.Element => {
	const handleCheckQuestionAsAnswered = async () => {
		const loadToast = toast.loading(`Marcando como respondida...`);
		try {
			if (query) {
				await database.ref(query).update({
					isAnswered: true,
				});
			}
			toast.success(`A pergunta foi marcada como respondida!`);
		} catch (e) {
			toast.error(`Erro ao marcar como pergunta respondida`);
		} finally {
			toast.dismiss(loadToast);
		}
	};
	return (
		<button type="button" onClick={() => handleCheckQuestionAsAnswered()}>
			<img src={CheckImg} alt="Marcar pergunta como respondida" />
		</button>
	);
};
