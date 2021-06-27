import * as Yup from "yup";

const MAX_QUESTION_LENGTH = 1000;
const MAX_QUESTION_LENGTH_ERROR_MESSAGE = `A sala pode ter no máximo ${MAX_QUESTION_LENGTH} caracteres`;

export type NewQuestionFormType = {
	newQuestion: string;
};

export const initialValues = {
	newQuestion: "",
};

export const validationSchema = Yup.object({
	newQuestion: Yup.string().max(
		MAX_QUESTION_LENGTH,
		MAX_QUESTION_LENGTH_ERROR_MESSAGE
	),
});
