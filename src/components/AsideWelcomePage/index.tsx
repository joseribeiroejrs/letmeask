import React, { ReactNode } from "react";
import IllustrationSVG from "../../assets/images/illustration.svg";
import "./styles.scss";

type AsideWelcomePageType = {
	children?: ReactNode;
};

export const AsideWelcomePage = (props: AsideWelcomePageType): JSX.Element => {
	const { children } = props;
	const title = "Crie salas de Q&A ao vivo";
	const description = "Tire as dúvidas de sua audiência em tempo real";
	return (
		<div id="page-auth">
			<aside>
				<img
					src={IllustrationSVG}
					alt="Ilustração simbolizando perguntas e respostas"
				/>
				<strong>{title}</strong>
				<p>{description}</p>
			</aside>
			<main>{children}</main>
		</div>
	);
};
