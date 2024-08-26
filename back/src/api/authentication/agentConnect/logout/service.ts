import { AgentConnectService } from '../../../../core/agentConnect/service';
import { generateRandomString } from '../../../../utils/generateRandomString';

interface ILogoutServiceOptions {
  idToken: string;
  agentConnectService: AgentConnectService;
}

interface ILogoutServiceResponse {
  logoutUrl: string;
}

export const service = ({
  idToken,
  agentConnectService,
}: ILogoutServiceOptions): ILogoutServiceResponse => {
  const state = generateRandomString();
  const nonce = generateRandomString();

  const logoutUrl = agentConnectService.getLogoutUrl(idToken, state, nonce);

  return { logoutUrl };
};
