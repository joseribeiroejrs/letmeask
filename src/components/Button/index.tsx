import React, { ButtonHTMLAttributes } from "react";
import "./styles.scss";

export type StyleButtonType = "outlined" | "primary" | "danger" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	styleButton?: StyleButtonType;
};

export const Button = ({
	styleButton = "primary",
	...props
}: ButtonProps): JSX.Element => {
	const getClassButton = () => styleButton || "primary";

	return <button className={`button ${getClassButton()}`} {...props}></button>;
};
