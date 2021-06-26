import React from "react";
import EmptyQuestionImg from "../../assets/images/empty-questions.svg";
import "./styles.scss";

export type EmptyType = {
	title: string;
	description: string;
};

export const Empty = ({ title, description }: EmptyType): JSX.Element => {
	return (
		<div className="empty-container">
			<img src={EmptyQuestionImg} alt="Logo simbolizando vazio" />
			<h4>{title}</h4>
			<p>{description}</p>
		</div>
	);
};
