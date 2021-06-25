import { useHistory, useParams } from "react-router-dom";
import LogoImg from "../../assets/images/logo.svg";
import { Button } from "../../components/Button";
import { Question } from "../../components/Question";
import { useAuth } from "../../hooks/useAuth";
import { useRoom } from "../../hooks/useRoom";
import { RoomCode } from "../../components/RoomCode";
import DeleteImg from "../../assets/images/delete.svg";
import "../../styles/room.scss";
import { database } from "../../services/firebase";

type RoomParams = {
  id: string;
};

export const AdminRoom = () => {
  // const { user } = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { title, questions } = useRoom(roomId);

  const handleEndRoom = async () => {
    const alertMessage = "Tem certeza que deseja encerrar a sala?";
    if (window.confirm(alertMessage)) {
      await database.ref(`rooms/${roomId}`).update({
        endedAt: new Date()
      })
      history.push('/')
    }
  }

  const handleDeleteQuestion = async (questionId: string | undefined) => {
    const alertMessage = "Tem certeza que deseja remover essa pergunta?"
    if(questionId && window.confirm(alertMessage)) {
      const query = `rooms/${roomId}/questions/${questionId}`
      const questionRef = await database.ref(query).remove();
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={LogoImg} alt="Let me ask Logo" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
          </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          <span>
            {questions?.length} pergunta{questions?.length ? "s" : ""}
          </span>
        </div>

        <div className="question-list">
          {questions.map((question) => (
            <Question
              key={question.id}
              content={question.content}
              author={question.author}
            >
              <button type="button" onClick={() => handleDeleteQuestion(question?.id)}>
                <img src={DeleteImg} alt="Remover pergunta" />
              </button>
            </Question>
          ))}
        </div>
      </main>
    </div>
  );
};
