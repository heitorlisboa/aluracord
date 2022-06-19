import styles from '@/styles/pages/Error404.module.scss';

export default function Error404Page() {
  return (
    <div className={styles.container}>
      <h1>Erro 404!</h1>
      <p>
        Opa! Parece que a página que você procura pegou fogo e, portanto, não
        pôde ser encontrada...
      </p>
    </div>
  );
}
