import * as Yup from "yup";

const MAX_LENGTH_ROOM_NAME = 50;
const CODE_MAX_LENGTH_MESSAGE_ERROR = `A sala pode ter no máximo ${MAX_LENGTH_ROOM_NAME} caracteres`;
export const initialValues = {
	code: "",
};
export const validationSchema = Yup.object({
	code: Yup.string().max(MAX_LENGTH_ROOM_NAME, CODE_MAX_LENGTH_MESSAGE_ERROR),
});
export type CodeFormType = {
	code: string;
};
