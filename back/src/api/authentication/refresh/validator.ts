import { z } from 'zod';
import { buildValidationMiddleware } from '../../../core/middlewares';
import { jwtTokenRegex } from '../common/const/regex';

export const refreshValidator = z.object({
  body: z.object({
    accessToken: z
      .string({
        required_error: "L'access token est requis",
      })
      .regex(jwtTokenRegex, "L'access token ne respecte pas le bon format"),
    refreshToken: z
      .string({
        required_error: 'Le refresh token est requis',
      })
      .regex(jwtTokenRegex, 'Le refresh token ne respecte pas le bon format'),
  }),
});

export type IRefreshRequest = z.infer<typeof refreshValidator>;

export default buildValidationMiddleware(refreshValidator);
