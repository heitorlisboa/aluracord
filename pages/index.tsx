import type { NextPage } from "next";
import { ChangeEvent, useState } from "react";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  const [username, setUsername] = useState("");

  function handleUsernameChange(event: ChangeEvent<HTMLInputElement>) {
    const newUsername = event.target.value;
    setUsername(newUsername);
  }

  return (
    <div className={styles.container}>
      <article className={styles.loginCard}>
        <div className={styles.login}>
          <h1>Boas vindas!</h1>
          <h2 className={styles.subtitle}>Aluracord - Zankyou no Terror</h2>
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
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
          />
          <span className={styles.username}>
            {username || "Seu nome"}
          </span>
        </div>
      </article>
    </div>
  );
};

export default Home;
