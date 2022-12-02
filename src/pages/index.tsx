import { signIn } from 'next-auth/react';
import { unstable_getServerSession } from 'next-auth';
import type { GetServerSideProps } from 'next';

import styles from '@/styles/pages/Home.module.scss';

import { authOptions } from './api/auth/[...nextauth]';

export default function Login() {
  async function handleLogin() {
    await signIn('github', { callbackUrl: '/chat' });
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <h1>Boas vindas!</h1>
        <h2 className={styles.subtitle}>Aluracord - Fullmetal Alchemist</h2>
        <button className={styles.loginButton} onClick={handleLogin}>
          Fazer login com GitHub
        </button>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (session) {
    return {
      redirect: {
        destination: '/chat',
        statusCode: 302,
      },
    };
  }

  return {
    props: {},
  };
};
