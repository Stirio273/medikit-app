import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../assets/register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [agree, setAgree] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas !");
      return;
    }

    const payload = { username, email, password, role };

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setMessage("Inscription réussie !");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        const data = await response.json();
        setMessage(data.message || "Erreur lors de l'inscription");
      }
    } catch (err) {
      setMessage("Erreur serveur : " + err.message);
    }
  };

  return (
    <div className="register-medical-container">
      {/* {message && <p className="register-message">{message}</p>} */}
    <div className="medical-background">
      <div className="medical-pattern"></div>
    </div>
    
    <div className="register-medical-card">
      <div className="medical-header">
        <div className="medical-logo">
          <i className="fas fa-heartbeat"></i>
          <h1>Medi<span>kit</span></h1>
        </div>
        <h2>Créer un compte</h2>
        <p>Rejoignez notre plateforme médicale sécurisée</p>
      </div>

      <form className="medical-register-form" onSubmit={handleRegister}>
        <div className="form-row">
          <div className="input-medical-group">
            <i className="fas fa-user"></i>
            <input 
              type="text" 
              placeholder="Nom complet" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>
          
          <div className="input-medical-group">
            <i className="fas fa-envelope"></i>
            <input 
              type="email" 
              placeholder="Email professionnel" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
        </div>
        
        <div className="form-row">
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
          
          <div className="input-medical-group">
            <i className="fas fa-lock"></i>
            <input 
              type="password" 
              placeholder="Confirmation" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required 
            />
          </div>
        </div>

        <div className="input-medical-group">
          <i className="fas fa-user-md"></i>
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="">Sélectionnez votre rôle</option>
            <option value="ROLE_DOCTOR">Médecin</option>
            <option value="ROLE_ADMIN">Administrateur</option>
          </select>
        </div>

        <div className="medical-options">
          <label className="medical-checkbox">
            <input type="checkbox" checked={agree} 
                onChange={(e)=>setAgree(e.target.checked)} required />
            <span className="checkmark"></span>
            J'accepte les <a href="#">conditions d'utilisation</a>
          </label>
        </div>

        <button type="submit" className="medical-btn">
          <i className="fas fa-user-plus"></i>
          Créer un compte
        </button>
      </form>

      <div className="medical-footer">
        <p>Déjà inscrit ? <a href="/login">Se connecter</a></p>
        
        <div className="medical-features">
          <div className="feature">
            <i className="fas fa-shield-alt"></i>
            <span>Sécurisé</span>
          </div>
          <div className="feature">
            <i className="fas fa-comment-medical"></i>
            <span>Support</span>
          </div>
          <div className="feature">
            <i className="fas fa-hand-holding-medical"></i>
            <span>Accès</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
