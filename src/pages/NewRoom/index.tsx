import React from "react";
import { Link, useHistory } from "react-router-dom";
import toast from "react-hot-toast";
import { useFormik } from "formik";

import LogoImg from "../../assets/images/logo.svg";
import { AsideWelcomePage } from "../../components/AsideWelcomePage";
import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";
import {
	CodeFormType,
	initialValues,
	validationSchema,
} from "../../shared/schemas/code.schema";

import "../Home/styles.scss";
import "./styles.scss";

export const NewRoom = (): JSX.Element => {
	const { user } = useAuth();
	const history = useHistory();

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: (formValue) => handleCreateRoom(formValue),
	});

	const handleCreateRoom = async (formValue: CodeFormType) => {
		const loadToast = toast.loading(`Criando sala...`);
		try {
			const { code } = formValue;
			if (code.trim() === "") {
				return;
			}

			const roomRef = database.ref("rooms");
			const firebaseRoom = await roomRef.push({
				title: code,
				authorId: user?.id,
			});

			history.push(`/admin/rooms/${firebaseRoom.key}`);
			toast.success(`A sua sala ${code} foi criada com sucesso!`);
		} catch (e) {
			toast.error(`Ops, ocorreu um erro ao criar a sala`);
		} finally {
			toast.dismiss(loadToast);
		}
	};

	const isDisabledButton = () =>
		!!formik.errors.code || formik.isSubmitting || !formik.values.code;

	const renderErrorMessage = () => (
		<div className="error-message">
			{formik.touched.code && formik.errors.code ? (
				<div>{formik.errors.code}</div>
			) : null}
		</div>
	);

	return (
		<AsideWelcomePage>
			<div className="main-content">
				<img src={LogoImg} alt="Let me ask" />
				<div className="user-info">
					<img src={user?.avatar} alt={user?.name} />
					<h1>{user?.name}</h1>
				</div>
				<h2>Criar uma nova sala</h2>
				<form onSubmit={formik.handleSubmit}>
					<input
						type="text"
						name="code"
						placeholder="Nome da Sala"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.code}
					/>
					{renderErrorMessage()}
					<Button type="submit" disabled={isDisabledButton()}>
						Criar sala
					</Button>
				</form>
				<p>
					Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
				</p>
			</div>
		</AsideWelcomePage>
	);
};
