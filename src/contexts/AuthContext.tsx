import React, { createContext, ReactNode, useState, useEffect } from "react";
import { auth, firebase } from "../services/firebase";

export type UserType = {
	id: string;
	name: string;
	avatar: string;
};

export type UserFirebaseType = {
	displayName: string;
	photoURL: string;
	uid: string;
};

export type AuthContextType = {
	user: UserType | undefined;
	signInWithGoogle: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

type AuthContextProviderProps = {
	children: ReactNode;
};

export const AuthContextProvider = (
	props: AuthContextProviderProps
): JSX.Element => {
	const [user, setUser] = useState<UserType>();

	useEffect(() => {
		const unsubscribeAuth = auth.onAuthStateChanged((user) => {
			updateUserValues(user as UserFirebaseType);
		});

		return () => {
			unsubscribeAuth();
		};
	}, [user]);

	const updateUserValues = (user: UserFirebaseType) => {
		if (user) {
			const { displayName, photoURL, uid } = user;
			if (!displayName || !photoURL) {
				throw new Error("Missing information from Google Account");
			}
			setUser({
				id: uid,
				name: displayName,
				avatar: photoURL,
			});
		}
	};

	const signInWithGoogle = async () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		const result = await auth.signInWithPopup(provider);

		if (result.user) {
			updateUserValues(result.user as UserFirebaseType);
		}
	};

	return (
		<AuthContext.Provider value={{ user, signInWithGoogle }}>
			{props.children}
		</AuthContext.Provider>
	);
};
