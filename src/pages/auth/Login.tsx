import "./Auth.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthService } from "../../services/AuthService";

const authService = new AuthService("http://localhost:8091");

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);




  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Usando o UserService para fazer login
      const data = await authService.login(email, password);

      if (!data.error) {
        setError(null);
        navigate("/"); // Redireciona após o login bem-sucedido
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="w-users-userformpagewrap full-page-wrapper">
      <div className="admin-form-card">
        <form onSubmit={handleSubmit}>
          <div className="w-users-userformheader form-card-header">
            <h2 className="heading h3">Entrar</h2>
            <p className="paragraph small">
              Preencha seus dados de login abaixo.
            </p>
          </div>
          {error && <p className="error">{error}</p>}
          <input
            maxLength={256}
            placeholder="E-mail"
            name="email"
            className="text-field w-input"
            type="email"
            autoComplete="on"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            maxLength={256}
            placeholder="Senha"
            name="password"
            className="text-field w-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="submit"
            className="w-users-userformbutton button w-button"
            value="Entrar"
          />
        </form>
      </div>
    </div>
  );
}
