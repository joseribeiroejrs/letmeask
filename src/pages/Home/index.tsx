import React from "react";
import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";
import { useFormik } from "formik";

import LogoImg from "../../assets/images/logo.svg";
import GoogleIconImg from "../../assets/images/google-icon.svg";
import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";
import { AsideWelcomePage } from "../../components/AsideWelcomePage";
import {
	CodeFormType,
	initialValues,
	validationSchema,
} from "../../shared/schemas/code.schema";
import "./styles.scss";

export const Home = (): JSX.Element => {
	const history = useHistory();
	const { user, signInWithGoogle } = useAuth();

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: (formValue) => handleJoinRoom(formValue),
	});

	const handleCreateRoom = async () => {
		const loadingToast = toast.loading(`Aguarde enquanto te identificamos...`);
		try {
			if (!user) {
				await signInWithGoogle();
			}
			toast(`Bom te ver de novo ${user?.name}!`);
			history.push("/rooms/new");
		} catch (e) {
			toast.dismiss(loadingToast);
			toast.error("Erro ao realizar login");
		} finally {
			toast.dismiss(loadingToast);
		}
	};

	const handleJoinRoom = async (formValue: CodeFormType) => {
		const loadingToast = toast.loading(`Procurando sala...`);
		try {
			const { code } = formValue;
			if (code.trim() === "") {
				return;
			}

			const roomRef = await database.ref(`rooms/${code}`).get();

			if (!roomRef.exists()) {
				toast.error(`A sala não existe`);
				return;
			}

			if (roomRef.val().endedAt) {
				toast.error(`A sala já foi fechada`);
				return;
			}

			toast.success(`Seja bem-vindo a sala`);
			history.push(`/rooms/${code}`);
		} catch (e) {
			toast.error(`Ops, ocorreu um erro ao procurar pela sala`);
		} finally {
			toast.dismiss(loadingToast);
			formik.resetForm({});
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
				<button className="create-room" onClick={handleCreateRoom}>
					<img src={GoogleIconImg} alt="Logo do Google" />
					Crie sua sala com o Google
				</button>
				<div className="separator">ou entre em uma sala</div>

				<form onSubmit={formik.handleSubmit}>
					<input
						type="text"
						name="code"
						placeholder="Digite o código da sala"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.code}
					/>
					{renderErrorMessage()}
					<Button type="submit" disabled={isDisabledButton()}>
						Entrar na sala
					</Button>
				</form>
			</div>
		</AsideWelcomePage>
	);
};
