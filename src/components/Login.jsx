import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/login.css";

export default function Login() {
  const navigate = useNavigate();
  const BASE_URL = "http://localhost:8080";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const payload = { email, password };

    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const token = await response.text(); // ton backend renvoie juste le JWT
        localStorage.setItem("token", token); // stocker le token côté frontend
        setMessage("Connexion réussie !");
        setTimeout(() => navigate("/dashboard"), 1000); // rediriger vers dashboard
      } else {
        const data = await response.json();
        setMessage(data.message || "Erreur d'identifiants");
      }
    } catch (err) {
      setMessage("Erreur serveur : " + err.message);
    }
  };

  return (
    <div className="login-medical-container">
      <div className="medical-background">
        <div className="medical-pattern"></div>
      </div>
      
      <div className="login-medical-card">
        <div className="medical-header">
          <div className="medical-logo">
            <i className="fas fa-heartbeat"></i>
            <h1>Medi<span>kit</span></h1>
          </div>
          <h2>Espace Professionnel</h2>
          <p>Connectez-vous à votre espace sécurisé</p>
        </div>

        <form className="medical-login-form" onSubmit={handleLogin}>
          <div className="input-medical-group">
            <i className="fas fa-user-md"></i>
            <input 
              type="email" 
              placeholder="Email professionnel" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div className="input-medical-group">
            <i className="fas fa-lock"></i>
            <input 
              type="password" 
              placeholder="Mot de passe" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          {/* <div className="medical-options">
            <label className="medical-checkbox">
              <input type="checkbox" />
              <span className="checkmark"></span>
              Se souvenir de moi
            </label>
            <a href="#" className="medical-forgot">Mot de passe oublié ?</a>
          </div> */}

          <button type="submit" className="medical-btn">
            <i className="fas fa-sign-in-alt"></i>
            Se connecter
          </button>
        </form>

        <div className="medical-alternative">
          <p>Pas encore inscrit ? <a href="/register">S'inscrire</a></p>
        </div>

        <div className="medical-features">
          <div className="feature">
            <i className="fas fa-shield-alt"></i>
            <span>Sécurité RGPD</span>
          </div>
          <div className="feature">
            <i className="fas fa-file-medical"></i>
            <span>Dossiers patients</span>
          </div>
          <div className="feature">
            <i className="fas fa-calendar-check"></i>
            <span>Gestion de RDV</span>
          </div>
        </div>
      </div>
    </div>
  );
}
