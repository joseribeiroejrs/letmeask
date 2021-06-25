import { useState, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";

import IllustrationSVG from "../../assets/images/illustration.svg";
import LogoImg from "../../assets/images/logo.svg";
import { Button } from "../../components/Button";

import { useAuth } from "../../hooks/useAuth";

import { database } from "../../services/firebase";

import "../Home/styles.scss";
import "./styles.scss";

export const NewRoom = () => {
  const [newRoom, setNewRoom] = useState("");
  const { user } = useAuth();
  const history = useHistory();

  const handleCreateRoom = async (event: FormEvent) => {
    event.preventDefault();

    if (newRoom.trim() === "") {
      return;
    }

    const roomRef = database.ref("rooms");
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id
    })

    history.push(`/rooms/${firebaseRoom.key}`)
    console.log(newRoom);
  };

  return (
    <div id="page-auth">
      <aside>
        <img
          src={IllustrationSVG}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas de sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={LogoImg} alt="Let me ask" />
          <h1>{user?.name}</h1>
          <h2>Criar uma nova sala</h2>
          <form onSubmit={(event) => handleCreateRoom(event)}>
            <input
              type="text"
              placeholder="Nome da sala"
              // value={newRoom}
              onChange={(event) => setNewRoom(event.target.value)}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
};
