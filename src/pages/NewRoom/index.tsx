import IllustrationSVG from "../../assets/images/illustration.svg";
import LogoImg from "../../assets/images/logo.svg";
import { Button } from "../../components/Button";

import "../Home/styles.scss";
import "./styles.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const NewRoom = () => {
  const { user } = useAuth();
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
          <form>
            <input type="text" placeholder="Nome da sala" />
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
