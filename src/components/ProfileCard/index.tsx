import React, { useContext } from 'react';
import ProfileContext from '../../lib/ProfileContext';
import type { GitHubUserInfo, ProfileContextInterface } from '../../types';
import styles from './ProfileCard.module.scss';

interface ProfileCardProps {
  userInfo: GitHubUserInfo | undefined;
}

const ProfileCard = React.forwardRef<HTMLDivElement, ProfileCardProps>(
  ({ userInfo }, ref) => {
    const { handleClickOut } = useContext(
      ProfileContext
    ) as ProfileContextInterface;

    return (
      <div className={styles.wrapper} tabIndex={-1} ref={ref}>
        {userInfo ? (
          <div className={styles.profileCard}>
            <img
              className={styles.avatar}
              src={userInfo.avatar_url}
              alt={`Foto de perfil de ${userInfo.login}`}
            />
            <h3 className={styles.header}>
              <span
                className={styles.fullName}
                aria-label={`${userInfo.name} (nome completo)`}
              >
                {userInfo.name}
              </span>
              <span
                className={styles.username}
                aria-label={`${userInfo.login} (nome de usuário)`}
              >
                {userInfo.login}
              </span>
            </h3>
            <section className={styles.about}>
              <h3 className={styles.aboutTitle}>Sobre mim</h3>
              <div className={styles.aboutBio}>{userInfo.bio}</div>
              <address className={styles.aboutLocation}>
                {userInfo.location}
                <div
                  className={styles.aboutSocials}
                  aria-label={`Redes sociais de ${userInfo.login}`}
                >
                  <a
                    className={styles.smallerIcon}
                    href={userInfo.html_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src="/svg/github-icon.svg" alt="GitHub" />
                  </a>
                  {userInfo.twitter_username && (
                    <a
                      href={`https://twitter.com/${userInfo.twitter_username}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src="/svg/twitter-icon.svg" alt="Twitter" />
                    </a>
                  )}
                  {userInfo.blog && (
                    <a href={userInfo.blog} target="_blank" rel="noreferrer">
                      <img src="/svg/web-icon.svg" alt="Blog/Website" />
                    </a>
                  )}
                </div>
              </address>
            </section>
            <button
              className={styles.closeButton}
              aria-label="Fechar perfil"
              onClick={handleClickOut}
            >
              <img src="/svg/close-icon.svg" alt="" />
            </button>
          </div>
        ) : (
          <div className={styles.profileCard}>
            <img className={styles.loading} src="/svg/loading.svg" alt="" />
          </div>
        )}
      </div>
    );
  }
);

ProfileCard.displayName = 'ProfileCard';

export default ProfileCard;
