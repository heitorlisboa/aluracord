import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

import styles from '@/styles/pages/Home.module.scss';

import { addAlert } from '@/lib/addAlert';

import { Alert } from '@/components/Alert';
import { validateInput } from '@/validators/validateInput';
import type { AlertCreated, AlertType } from '@/types';

export default function Login() {
  const [username, setUsername] = useState('');
  const [alerts, setAlerts] = useState<AlertType[]>([]);
  const router = useRouter();
  const userImageRef = useRef<HTMLImageElement>(null);
  const defaultUserImage = '/img/user-icon.jpg';

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
    fetch(`https://api.github.com/users/${username}`).then((res) => {
      if (res.status !== 200) {
        const newAlert: AlertCreated = {
          type: 'danger',
          message: 'Insira um usuário do GitHub válido',
        };
        addAlert(newAlert, alerts, setAlerts);
      } else {
        router.push({
          pathname: '/chat',
          query: {
            username,
          },
        });
      }
    });
  }

  useEffect(() => {
    handleInvalidUser();
  }, []);

  return (
    <div className={styles.container}>
      {alerts.map((alert, index) => (
        <Alert key={index} type={alert.type} ref={alert.ref}>
          {alert.message}
        </Alert>
      ))}
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
          <img
            src={`https://github.com/${username}.png`}
            onError={handleInvalidUser}
            ref={userImageRef}
          />
          <span className={styles.username}>{username || 'Seu nome'}</span>
        </div>
      </article>
    </div>
  );
}
