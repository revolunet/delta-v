import React, { useState } from 'react';

import { Meta } from '@storybook/react';
import { useForm } from 'react-hook-form';

import { Modal } from './ModalWithTitleButton';
import { InputGroup } from '@/components/input/InputGroup';

export default {
  title: 'Components/Molecules/Modal',
  component: Modal,
} as Meta;

type FormValues = {
  comment: string;
};

export const ModalWithTextArea = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const methods = useForm<FormValues>({
    defaultValues: {
      comment: '',
    },
  });
  const {
    register,
    formState: { errors },
  } = methods;

  const onClose = (): void => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        title="Êtes-vous sur de vouloir quitter la simulation ?"
        subtitle="Si vous quittez la simulation vous perdrez toutes vos données."
        open={open}
        onClose={onClose}
      >
        <div className="align-center w-5/6">
          <InputGroup
            type="textarea"
            rows={2}
            error={errors.comment?.message}
            placeholder="here..."
            register={register('comment', {
              required: true,
            })}
            name="comment"
          />
        </div>
      </Modal>
      <button
        onClick={() => setOpen(true)}
        className="align-center mt-base ml-base items-center rounded-md bg-primary-500 p-small"
      >
        open modal
      </button>
    </div>
  );
};

export const ModalWithInput = (): JSX.Element => {
  const [open, setOpen] = useState(true);
  const methods = useForm<FormValues>({
    defaultValues: {
      comment: '',
    },
  });
  const {
    register,
    formState: { errors },
  } = methods;

  const onClose = (): void => {
    setOpen(false);
  };

  return (
    <div>
      <Modal title="firstName" open={open} onClose={onClose}>
        <div className="align-center w-5/6">
          <InputGroup
            type="text"
            rows={2}
            error={errors.comment?.message}
            placeholder="here..."
            register={register('comment', {
              required: true,
            })}
            name="comment"
          />
        </div>
      </Modal>
      <button
        onClick={() => setOpen(true)}
        className="align-center mt-base ml-base items-center rounded-md bg-primary-500 p-small"
      >
        open modal
      </button>
    </div>
  );
};
