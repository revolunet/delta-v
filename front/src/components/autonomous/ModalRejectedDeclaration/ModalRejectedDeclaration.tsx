import React from 'react';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration'; // import duration plugin

import { Button } from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import { Typography } from '@/components/common/Typography';

dayjs.extend(duration); // extend dayjs with duration plugin

interface ModalRejectedDeclarationProps {
  open: boolean;
  isLoading: boolean;
  onClose: () => void;
  onRejectedForError: () => void;
  onRejectedForLitigation: () => void;
}

export const ModalRejectedDeclaration: React.FC<ModalRejectedDeclarationProps> = ({
  onClose,
  open,
  isLoading,
  onRejectedForError,
  onRejectedForLitigation,
}) => {
  return (
    <>
      <Modal open={open} onClose={onClose} withMargin={false}>
        <div className="flex flex-col items-center">
          <div className="w-[190px]">
            <Typography size="text-xs" color="secondary" textPosition="text-center">
              La déclaration est non conforme pour cause de :
            </Typography>
          </div>
          <div className="flex flex-1 flex-col items-center mt-5 gap-3">
            <Button onClick={onRejectedForError} disabled={isLoading} fullWidth>
              Contentieux
            </Button>
            <Button onClick={onRejectedForLitigation} disabled={isLoading} fullWidth>
              Erreur de l’usager
            </Button>
            <Typography
              size="text-xs"
              color="primary"
              textPosition="text-center"
              underline
              onClick={onClose}
            >
              Annuler
            </Typography>
          </div>
        </div>
      </Modal>
    </>
  );
};
