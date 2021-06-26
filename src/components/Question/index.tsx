import React, { ReactNode } from "react";
import classNames from "classnames";
import "./styles.scss";

type QuestionProps = {
	content: string;
	children?: ReactNode;
	author: {
		name: string;
		avatar: string;
	};
	isAnswered?: boolean;
	isHighlighted?: boolean;
};

export const Question = ({
	content,
	author,
	children,
	isAnswered = false,
	isHighlighted = false,
}: QuestionProps): JSX.Element => {
	return (
		<div
			className={classNames(
				"question",
				{ answered: isAnswered },
				{ highlighted: isHighlighted && !isAnswered }
			)}
		>
			<p>{content}</p>
			<footer>
				<div className="user-info">
					<img src={author.avatar} alt={author.name} />
					<span>{author.name}</span>
				</div>
				<div>{children}</div>
			</footer>
		</div>
	);
};
