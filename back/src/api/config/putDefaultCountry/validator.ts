import { z } from 'zod';
import { buildValidationMiddleware } from '../../../core/middlewares';
import { Alpha2CodeEnum } from '../../../utils/country.util';

export const putDefaultCountryValidator = z.object({
  body: z.object({
    country: z.nativeEnum(Alpha2CodeEnum, { required_error: 'Le code du pays est requis' }),
  }),
});

export type PutDefaultCountryRequest = z.infer<typeof putDefaultCountryValidator>;

export default buildValidationMiddleware(putDefaultCountryValidator);
