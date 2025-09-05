import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Vérifier si le token existe
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Ici tu peux décoder le token pour obtenir le nom d'utilisateur
    // ou faire un fetch pour récupérer les infos utilisateur
    // Pour l'instant on simule :
    setUsername("Utilisateur");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Bienvenue, {username}</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Déconnexion
        </button>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-card">
          <h2>Agenda</h2>
          <p>Consultez vos rendez-vous du jour</p>
          {/* Ici tu pourras intégrer un tableau ou calendrier */}
        </div>

        <div className="dashboard-card">
          <h2>Support de cours</h2>
          <p>Accédez aux résumés pour rafraîchir votre mémoire</p>
        </div>

        <div className="dashboard-card">
          <h2>Notifications</h2>
          <p>Dernières informations importantes</p>
        </div>
      </main>
    </div>
  );
}
