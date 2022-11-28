import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import * as Dialog from '@radix-ui/react-dialog';

import styles from './ProfileDialog.module.scss';

import { fetchUserInfo } from '@/lib/Store';

type ProfileDialogProps = {
  username: string;
};

export function ProfileDialog({ username }: ProfileDialogProps) {
  const { data: userData, isLoading } = useQuery({
    queryKey: [`github-user/${username}`],
    queryFn: () => fetchUserInfo(username),
  });

  return (
    <Dialog.Portal className={styles.container}>
      <Dialog.Overlay className={styles.overlay} />

      <div className={styles.contentContainer}>
        <Dialog.Content className={styles.content}>
          {isLoading ? (
            <div className={styles.loading} aria-live="polite" aria-busy />
          ) : userData ? (
            <>
              <Image
                className={styles.avatar}
                width={112}
                height={112}
                src={userData.avatar_url}
                alt={`Foto de perfil de ${userData.login}`}
                priority
              />

              <Dialog.Title className={styles.header} asChild>
                <div>
                  {userData.name && (
                    <strong className={styles.fullName}>
                      {userData.name}{' '}
                      <span className="sr-only">(nome completo)</span>
                    </strong>
                  )}
                  <div className={styles.username}>
                    {userData.login}{' '}
                    <span className="sr-only">(nome de usuário)</span>
                  </div>
                </div>
              </Dialog.Title>

              <div className={styles.about}>
                <strong>Sobre mim</strong>
                <div>{userData.bio}</div>
                <address className={styles.aboutLocation}>
                  {userData.location}
                </address>
                <div
                  className={styles.aboutSocials}
                  aria-label={`Redes sociais de ${userData.login}`}
                >
                  <a href={userData.html_url} target="_blank" rel="noreferrer">
                    <Image
                      className={styles.smallerIcon}
                      width={32}
                      height={32}
                      src="/icons/github-icon.svg"
                      alt="GitHub"
                      priority
                    />
                  </a>
                  {userData.twitter_username && (
                    <a
                      href={`https://twitter.com/${userData.twitter_username}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Image
                        width={32}
                        height={32}
                        src="/icons/twitter-icon.svg"
                        alt="Twitter"
                        priority
                      />
                    </a>
                  )}
                  {userData.blog && (
                    <a href={userData.blog} target="_blank" rel="noreferrer">
                      <Image
                        width={32}
                        height={32}
                        src="/icons/web-icon.svg"
                        alt="Blog/Website"
                        priority
                      />
                    </a>
                  )}
                </div>
              </div>
            </>
          ) : (
            <span className={styles.fetchFailure}>
              Não foi possível carregar os dados do usuário
            </span>
          )}

          <Dialog.Close className={styles.closeButton}>
            <img src="/icons/close-icon.svg" alt="Fechar perfil do usuário" />
          </Dialog.Close>
        </Dialog.Content>
      </div>
    </Dialog.Portal>
  );
}
