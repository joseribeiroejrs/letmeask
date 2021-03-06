import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

export type QuestionType = {
	id?: string;
	author: {
		name: string;
		avatar: string;
	};
	content: string;
	isAnswered: boolean;
	isHighlighted: boolean;
	likeCount: number;
	likeId: string | undefined;
};

type FirebaseQuestions = Record<
	string,
	{
		author: {
			name: string;
			avatar: string;
		};
		content: string;
		isAnswered: boolean;
		isHighlighted: boolean;
		likes: Record<
			string,
			{
				authorId: string;
			}
		>;
	}
>;

type useRoomResponseType = {
	title: string;
	questions: QuestionType[];
};

export const useRoom = (roomId: string): useRoomResponseType => {
	const { user } = useAuth();
	const [questions, setQuestions] = useState<QuestionType[]>([]);
	const [title, setTitle] = useState("");

	useEffect(() => {
		const roomRef = database.ref(`rooms/${roomId}`);

		roomRef.on("value", (room) => {
			const databaseRoom = room.val();
			const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
			const parsedQuestions = Object.entries(firebaseQuestions).map(
				([key, value]) => {
					const { content, author, isAnswered, isHighlighted } = value;
					return {
						id: key,
						content,
						author,
						isAnswered,
						isHighlighted,
						likeCount: Object.values(value.likes ?? {}).length,
						likeId: Object.entries(value.likes ?? {}).find(
							([key, like]) => like.authorId === user?.id
						)?.[0],
					};
				}
			);

			setTitle(databaseRoom.title);
			setQuestions(parsedQuestions);

			return () => {
				roomRef.off("value");
			};
		});
	}, [roomId, user?.id]);

	return { title, questions };
};
