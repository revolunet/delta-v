import { useMutation, useQuery } from 'react-query';

import { getDefaultCountryRequest, putDefaultCountryRequest } from '../lib/config';
import { ErrorResponse, PutDefaultCountryParams } from '../lib/types';

export const usePutDefaultCountryMutation = ({ onSuccess }: { onSuccess?: () => void }) => {
  return useMutation<void, ErrorResponse, PutDefaultCountryParams>(putDefaultCountryRequest, {
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
    },
  });
};

export const useGetDefaultCountry = () => useQuery('defaultCountry', getDefaultCountryRequest);
