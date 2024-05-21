import axios from 'axios';

import { PutDefaultCountryParams } from './types';

export const putDefaultCountryRequest = async (params: PutDefaultCountryParams): Promise<void> => {
  const bodyParams = {
    country: params.country,
  };

  await axios.put(`/defaultCountry`, bodyParams);
};
