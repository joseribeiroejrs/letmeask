import { useHistory } from "react-router-dom";
import IllustrationSVG from "../../assets/images/illustration.svg";
import LogoImg from "../../assets/images/logo.svg";
import GoogleIconImg from "../../assets/images/google-icon.svg";
import { Button } from "../../components/Button";
import "./styles.scss";
import { useAuth } from "../../hooks/useAuth";

export const Home = () => {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();

  const handleCreateRoom = async () => {
    if (!user) {
      await signInWithGoogle();
    }
    history.push("/rooms/new");
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
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={GoogleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form>
            <input type="text" placeholder="Digite o código da sala" />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
};
