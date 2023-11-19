import { useState } from "react";
import Header from "../components/Header";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    if (username === "admin" && password === "123456") {
      localStorage.setItem("isAdminLoggedIn", "true");
      setUsername("");
      setPassword("");
      navigate("/");
    } else {
      alert("Usuário ou senha incorretos");
    }
  };

  return (
    <>
      <Header />
      <Wrapper>
        <h1>Entrar como Administrador</h1>

        <form onSubmit={handleLogin}>
          <label htmlFor="username">Usuário</label>
          <input
            type="text"
            id="username"
            placeholder="Insira o nome de usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            placeholder="Insira a senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Entrar</button>
        </form>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  height: 70vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--gray);
    padding: 40px;
  }

  input,
  label,
  select,
  button {
    width: 400px;
    text-align: center;
    margin: 3px 0;
  }

  h1 {
    text-transform: uppercase;
    margin-bottom: 25px;
    font-weight: 600;
    font-size: 20px;
    color: var(--dark-green);
  }

  button {
    background-color: var(--dark-green);
  }

  input,
  select,
  button {
    border-radius: 10px;
    height: 30px;
    border: none;
  }

  button {
    margin-top: 15px;
    color: white;
    text-transform: uppercase;
    font-weight: 600;
    cursor: pointer;
  }

  label {
    margin-top: 10px;
  }
`;
