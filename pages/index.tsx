import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import type { ChangeEvent, FormEvent } from "react";
import styles from "../styles/pages/Home.module.scss";
import validateInput from "../validators/validateInput";

const Home: NextPage = () => {
  const [username, setUsername] = useState("");
  const router = useRouter();
  const userImageRef = useRef<HTMLImageElement>(null);
  const defaultUserImage = "/user-icon.jpg";

  function handleUsernameChange(event: ChangeEvent<HTMLInputElement>) {
    let newUsername = event.target.value;
    const regex = /[\w\-]*/g;
    newUsername = validateInput(newUsername, regex);
    setUsername(newUsername);
  }

  function handleInvalidUser() {
    const userImageElement = userImageRef.current;

    if (userImageElement) {
      userImageElement.src = defaultUserImage;
    }
  }

  function handleSubmitForm(event: FormEvent) {
    event.preventDefault();
    router.push({
      pathname: "/chat",
      query: {
        username,
      },
    });
  }

  useEffect(() => {
    handleInvalidUser();
  }, []);

  return (
    <div className={styles.container}>
      <article className={styles.loginCard}>
        <div className={styles.login}>
          <h1>Boas vindas!</h1>
          <h2 className={styles.subtitle}>Aluracord - Fullmetal Alchemist</h2>
          <form className={styles.loginForm} onSubmit={handleSubmitForm}>
            <input
              className={styles.usernameInput}
              type="text"
              name="username"
              placeholder="Nome de usuário"
              aria-label="Nome de usuário"
              value={username}
              onChange={handleUsernameChange}
              required
            />
            <button className={styles.submitButton} type="submit">
              Entrar
            </button>
          </form>
        </div>
        <div className={styles.user}>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={`https://github.com/${username}.png`}
              onError={handleInvalidUser}
              ref={userImageRef}
            />
          </a>
          <span className={styles.username}>{username || "Seu nome"}</span>
        </div>
      </article>
    </div>
  );
};

export default Home;
