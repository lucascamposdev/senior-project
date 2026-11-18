import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="page-center">
      <div className="card home-card">
        <h1>Olá, {user?.username}</h1>
        <button onClick={handleLogout}>Sair</button>
      </div>
    </div>
  );
}
