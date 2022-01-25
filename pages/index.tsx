import type { NextPage } from "next";
import { ChangeEvent, useState } from "react";
import styles from "../styles/pages/Home.module.scss";
import validateInput from "../validators/validateInput";

const Home: NextPage = () => {
  const [username, setUsername] = useState("");

  function handleUsernameChange(event: ChangeEvent<HTMLInputElement>) {
    let newUsername = event.target.value;
    const regex = /[\w\-]*/g;
    newUsername = validateInput(newUsername, regex)
    setUsername(newUsername);
  }

  return (
    <div className={styles.container}>
      <article className={styles.loginCard}>
        <div className={styles.login}>
          <h1>Boas vindas!</h1>
          <h2 className={styles.subtitle}>Aluracord - Fullmetal Alchemist</h2>
          <form
            className={styles.loginForm}
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              className={styles.usernameInput}
              type="text"
              name="username"
              placeholder="Nome de usuário"
              aria-label="Nome de usuário"
              value={username}
              onChange={handleUsernameChange}
            />
            <button className={styles.submitButton} type="submit">
              Entrar
            </button>
          </form>
        </div>
        <div className={styles.user}>
          <img
            src={
              username
                ? `https://github.com/${username}.png`
                : "https://i.pinimg.com/736x/f6/eb/d0/f6ebd02f46f05d2f95c33203f938cbbf.jpg"
            }
          />
          <span className={styles.username}>{username || "Seu nome"}</span>
        </div>
      </article>
    </div>
  );
};

export default Home;
