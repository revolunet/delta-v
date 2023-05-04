import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'Invalid JWT token format.',
    publicMessage: 'Invalid JWT token format.',
    code: ErrorCodes.INVALID_JWT_FORMAT,
    statusCode: HttpStatuses.UNAUTHORIZED,
  });
