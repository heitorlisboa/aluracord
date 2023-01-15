import { motion } from 'framer-motion';

import styles from './DeleteMessageButton.module.scss';

import { Dialog } from '@/components/Dialog';

type DeleteMessageButtonProps = {
  onConfirmDelete: () => void;
};

export function DeleteMessageButton({
  onConfirmDelete,
}: DeleteMessageButtonProps) {
  return (
    <Dialog.Root
      trigger={
        <Dialog.Trigger>
          <img src="/icons/delete-icon.svg" alt="Deletar" />
        </Dialog.Trigger>
      }
      content={
        <motion.div
          className={styles.dialogContentContainer}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'tween' }}
        >
          <Dialog.Content className={styles.dialogContent}>
            <Dialog.Title asChild>
              <strong className={styles.dialogTitle}>Deletar mensagem</strong>
            </Dialog.Title>
            <Dialog.Description className={styles.dialogDescription}>
              Deseja realmente deletar essa mensagem? Não é possível desfazer
              essa ação.
            </Dialog.Description>
            <div className={styles.dialogButtons}>
              <Dialog.Close
                className={styles.dialogConfirmButton}
                onClick={onConfirmDelete}
              >
                Confirmar
              </Dialog.Close>
              <Dialog.Close className={styles.dialogCancelButton}>
                Cancelar
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </motion.div>
      }
    />
  );
}
