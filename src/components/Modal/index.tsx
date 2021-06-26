import React from "react";
import { Modal as ResponsiveModal } from "react-responsive-modal";

import RemoveImg from "../../assets/images/remove.svg";

import "react-responsive-modal/styles.css";
import { Button, StyleButtonType } from "../Button";
import "./styled.scss";

type ModalTypes = "danger" | "success";

type ModalProps = {
	title: string;
	description: string;
	primaryButtonLabel?: string;
	secondaryButtonLabel?: string;
	type?: ModalTypes;
	isOpen: boolean;
	onClose: () => void;
	confirmEvent: () => void;
};

export const Modal = (props: ModalProps): JSX.Element => {
	const {
		title,
		description,
		primaryButtonLabel = "Ok",
		secondaryButtonLabel = "Cancelar",
		type = "danger",
		isOpen,
		onClose,
		confirmEvent,
	} = props;

	return (
		<>
			<ResponsiveModal
				open={isOpen}
				showCloseIcon={false}
				onClose={onClose}
				center
				classNames={{ modal: "custom-modal" }}
			>
				<div className="modal-container">
					<img src={RemoveImg} alt="Imagem de remoção" />
					<h2 className="modal-title">{title}</h2>
					<p className="modal-description">{description}</p>

					<div className="modal-actions">
						<Button styleButton="secondary" onClick={onClose}>
							{secondaryButtonLabel}
						</Button>
						<Button
							styleButton={type as StyleButtonType}
							onClick={confirmEvent}
						>
							{primaryButtonLabel}
						</Button>
					</div>
				</div>
			</ResponsiveModal>
		</>
	);
};
