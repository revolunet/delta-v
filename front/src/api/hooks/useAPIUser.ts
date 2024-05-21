import { useMutation } from 'react-query';

import { ErrorResponse, PutDefaultCountryParams } from '../lib/types';
import { putDefaultCountryRequest } from '../lib/user';

export const usePutDefaultCountryMutation = ({ onSuccess }: { onSuccess?: () => void }) => {
  return useMutation<void, ErrorResponse, PutDefaultCountryParams>(putDefaultCountryRequest, {
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
    },
  });
};
