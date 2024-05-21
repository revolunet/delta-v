import { Alpha2Code } from 'i18n-iso-countries';
import { UserRepositoryInterface } from '../../../repositories/user.repository';
import userNotFoundError from '../../common/errors/userNotFound.error';

interface PutDefaultCountryOptions {
  userId: string;
  country: string;
  userRepository: UserRepositoryInterface;
}

export const service = async ({
  userId,
  country,
  userRepository,
}: PutDefaultCountryOptions): Promise<void> => {
  const user = await userRepository.getOneById(userId);
  if (!user) {
    throw userNotFoundError();
  }

  const updateUser = { defaultCountry: country as Alpha2Code };

  await userRepository.updateUser(userId, updateUser);
};
