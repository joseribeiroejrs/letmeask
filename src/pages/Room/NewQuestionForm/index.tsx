import React from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { FormikHelpers, useFormik } from "formik";

import { Button } from "../../../components/Button";
import { UserType } from "../../../contexts/AuthContext";
import { useAuth } from "../../../hooks/useAuth";
import { database } from "../../../services/firebase";
import { RoomParams } from "../../AdminRoom/AdminQuestionsOptions";

import { initialValues, validationSchema, NewQuestionFormType } from "./schema";

export const NewQuestionForm = (): JSX.Element => {
	const { user } = useAuth();
	const params = useParams<RoomParams>();
	const roomId = params.id;

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: (formValue, actions) => handleSendQuestion(formValue, actions),
	});

	const getRequestPayload = (content: string, user: UserType) => {
		const { name, avatar } = user;

		return {
			content,
			author: {
				name,
				avatar,
			},
			isHighlighted: false,
			isAnswered: false,
		};
	};

	const handleSendQuestion = async (
		formValue: NewQuestionFormType,
		actions: FormikHelpers<NewQuestionFormType>
	) => {
		const loadToast = toast.loading(`Enviando pergunta...`);
		try {
			const { newQuestion } = formValue;
			if (newQuestion.trim() === "") {
				return;
			}

			if (!user) {
				throw new Error("You must be logged in ");
			}
			const question = getRequestPayload(newQuestion, user);
			await database.ref(`rooms/${roomId}/questions`).push(question);
			actions.resetForm({});
			toast.success(`Sucesso ao enviar a pergunta`);
		} catch (e) {
			toast.error(`Erro ao enviar a pergunta`);
		} finally {
			toast.dismiss(loadToast);
		}
	};

	const renderErrors = () => (
		<div className="error-message">
			{formik.touched.newQuestion && formik.errors.newQuestion ? (
				<div>{formik.errors.newQuestion}</div>
			) : null}
		</div>
	);

	const renderUserInfoOrPleaseLogin = () => (
		<>
			{user ? (
				<div className="user-info">
					<img src={user?.avatar} alt={user?.name} />
					<span>{user?.name}</span>
				</div>
			) : (
				<span>
					Para enviar uma pergunta, <button>faça seu login</button>.
				</span>
			)}
		</>
	);

	return (
		<form onSubmit={formik.handleSubmit}>
			<textarea
				name="newQuestion"
				placeholder="O que você quer perguntar?"
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values.newQuestion}
			></textarea>
			{renderErrors()}
			<div className="form-footer">
				{renderUserInfoOrPleaseLogin()}
				<Button type="submit" disabled={!user}>
					Enviar pergunta
				</Button>
			</div>
		</form>
	);
};
