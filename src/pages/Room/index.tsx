import { useRef } from "react";
import { useEffect } from "react";
import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import LogoImg from "../../assets/images/logo.svg";
import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";
import { RoomCode } from "./components/RoomCode";
import "./styles.scss";

type RoomParams = {
  id: string;
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
  }
>;

type Question = {
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
};

export const Room = () => {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const [newQuestion, setNewQuestion] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);
    roomRef.on("value", (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isAnswered: value.isAnswered,
            isHighlighted: value.isHighlighted,
          };
        }
      );

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
      console.log("Parsed Questions: ", parsedQuestions);
    });
  }, [roomId]);

  const handleNewQuestionChange = (event: any) => {
    setNewQuestion(event.target.value);
  };

  const handleSendQuestion = async (event: FormEvent) => {
    event.preventDefault();
    if (newQuestion.trim() === "") {
      return;
    }
    if (!user) {
      // TODO: REACT HOT TOAST COLOCAR NO FUTURO
      throw new Error("You must be logged in ");
    }

    const { name, avatar } = user;

    const question = {
      content: newQuestion,
      author: {
        name,
        avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion("");
  };

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={LogoImg} alt="Let me ask Logo" />
          <RoomCode code={roomId} />
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          <span>
            {questions?.length} pergunta{questions?.length ? "s" : ""}
          </span>
        </div>

        <form onSubmit={(event) => handleSendQuestion(event)}>
          <textarea
            placeholder="O que você quer perguntar?"
            onChange={handleNewQuestionChange}
          ></textarea>
          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user?.avatar} alt={user?.name} />
                <span>{user?.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta, <button>faça seu login</button>.
              </span>
            )}

            <Button type="submit" disabled={!user}>
              Enviar pergunta
            </Button>
          </div>
        </form>
        {JSON.stringify(questions)}
      </main>
    </div>
  );
};
