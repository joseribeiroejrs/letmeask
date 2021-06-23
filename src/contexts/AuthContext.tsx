import { createContext, ReactNode, useState, useEffect } from "react";
import { auth, firebase } from "../services/firebase";

type UserType = {
  id: string;
  name: string;
  avatar: string;
};

type AuthContextType = {
  user: UserType | undefined;
  signInWithGoogle: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = (props: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user: any) => {
      updateUserValues(user);
    });

    return () => {
      unsubscribeAuth();
    };
  }, [user]);

  const updateUserValues = (user: any) => {
    const { displayName, photoURL, uid } = user;
    if (!displayName || !photoURL) {
      throw new Error("Missing information from Google Account");
    }
    setUser({
      id: uid,
      name: displayName,
      avatar: photoURL,
    });
  };

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      updateUserValues(result.user);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
};
