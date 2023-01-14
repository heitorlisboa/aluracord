import { type ReactElement, useState, cloneElement } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';

import styles from './Dialog.module.scss';

type DialogRootProps = {
  trigger: ReactElement;
  content: ReactElement;
};

function DialogRoot({ trigger, content }: DialogRootProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <DialogPrimitive.Root onOpenChange={setIsDialogOpen}>
      {trigger}
      <DialogPrimitive.Portal forceMount>
        <AnimatePresence>
          {isDialogOpen && (
            <>
              <DialogPrimitive.Overlay
                key="dialog-overlay"
                className={styles.overlay}
                asChild
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'tween' }}
                />
              </DialogPrimitive.Overlay>
              {cloneElement(content, {
                key: 'dialog-content',
              })}
            </>
          )}
        </AnimatePresence>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export const Dialog = {
  Root: DialogRoot,
  Trigger: DialogPrimitive.Trigger,
  Content: DialogPrimitive.Content,
  Title: DialogPrimitive.Title,
  Description: DialogPrimitive.Description,
  Close: DialogPrimitive.Close,
};
