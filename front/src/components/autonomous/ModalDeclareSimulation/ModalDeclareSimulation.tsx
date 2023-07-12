import React from 'react';

import { useRouter } from 'next/router';

import { Button } from '@/components/common/Button';
import Modal from '@/components/common/Modal';

interface ModalDeclareSimulationProps {
  open: boolean;
  onClose?: () => void;
}

export const ModalDeclareSimulation: React.FC<ModalDeclareSimulationProps> = ({
  onClose,
  open,
}) => {
  const router = useRouter();
  const onDeclare = (): void => {
    router.push('/declaration/ajout/coordonnees?from=simulateur');
    if (onClose) {
      onClose();
    }
  };
  return (
    <>
      <Modal title="Êtes-vous sûr de vouloir déclarer vos produits ?" open={open} onClose={onClose}>
        <div className="flex flex-row gap-4">
          <Button
            size="lg"
            variant="outlined"
            onClick={onDeclare}
            className={{ 'w-[100px]': true }}
          >
            Oui
          </Button>
          <Button size="lg" variant="outlined" onClick={onClose} className={{ 'w-[100px]': true }}>
            Non
          </Button>
        </div>
      </Modal>
    </>
  );
};
