import { IncomingMessage } from 'http';
import { Http2ServerRequest } from 'http2';
import { Issuer, Client, TokenSet } from 'openid-client';
import * as jose from 'jose';
import { AgentConnectConfig } from './config';
import { Agent } from './lib';

export interface IAgentConnectService {
  getAuthorizationUrl(state: string, nonce: string): string;
  getCallbackParams(req: IncomingMessage | string | Http2ServerRequest): any;
  getTokenSet(params: any, state: string, nonce: string): Promise<TokenSet>;
  getUserInfo(accessToken: string): Promise<any>;
  mapToUser(userInfo: any): Agent;
  getLogoutUrl(idToken: string, state: string): string;
  getPublicKey(): Promise<jose.KeyLike>;
  refreshTokenSet(tokenSet: TokenSet): Promise<TokenSet>;
  checkAndRefreshToken(tokenSet: TokenSet): Promise<TokenSet>;
  verifyIdToken(idToken: string): Promise<jose.JWTVerifyResult>;
}

export class AgentConnectService implements IAgentConnectService {
  private config: AgentConnectConfig;
  private client: Client;
  private issuer: Issuer;

  constructor(config: AgentConnectConfig) {
    this.config = config;
    void this.initializeClient();
  }

  private async initializeClient(): Promise<void> {
    this.issuer = await Issuer.discover(this.config.issuer);
    this.client = new this.issuer.Client({
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      redirect_uris: [this.config.redirectUri],
      response_types: ['code'],
      id_token_signed_response_alg: this.config.id_token_signed_response_alg,
      userinfo_signed_response_alg: this.config.userinfo_signed_response_alg,
    });
  }

  public getAuthorizationUrl(state: string, nonce: string): string {
    return this.client.authorizationUrl({
      scope: this.config.scope,
      state,
      nonce,
      acr_values: 'eidas1',
      prompt: 'login',
    });
  }

  public getCallbackParams(req: IncomingMessage | string | Http2ServerRequest): any {
    return this.client.callbackParams(req);
  }

  public async getTokenSet(params: any, state: string, nonce: string): Promise<TokenSet> {
    try {
      const tokenSet = await this.client.callback(this.config.redirectUri, params, {
        state,
        nonce,
      });
      return tokenSet;
    } catch (error) {
      console.error('Error in getTokenSet:', error);
      throw error;
    }
  }

  public async getUserInfo(accessToken: string): Promise<any> {
    try {
      return await this.client.userinfo(accessToken);
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw error;
    }
  }

  public mapToUser(userInfo: any): Agent {
    return {
      id: userInfo.sub,
      email: userInfo.email,
      firstName: userInfo.given_name,
      lastName: userInfo.family_name,
      username: userInfo.preferred_username,
      createdAt: new Date(userInfo.created_at),
      updatedAt: new Date(userInfo.updated_at),
    };
  }

  public getLogoutUrl(idToken: string, state: string): string {
    return this.client.endSessionUrl({
      id_token_hint: idToken,
      state,
      post_logout_redirect_uri: this.config.postLogoutRedirectUri,
    });
  }

  public async getPublicKey(): Promise<jose.KeyLike> {
    try {
      if (!this.issuer.jwks_uri) {
        throw new Error('JWKS URI is not available');
      }

      const jwks = jose.createRemoteJWKSet(new URL(this.issuer.metadata.jwks_uri as string));

      // Récupérer la clé publique
      const key = await jwks({ alg: this.config.id_token_signed_response_alg });

      if (!key) {
        throw new Error('No public key found');
      }

      return key;
    } catch (error) {
      console.error('Error fetching public key:', error);
      throw error;
    }
  }

  public async refreshTokenSet(tokenSet: TokenSet): Promise<TokenSet> {
    if (!tokenSet.refresh_token) {
      throw new Error('No refresh token available');
    }
    return await this.client.refresh(tokenSet.refresh_token);
  }

  public async checkAndRefreshToken(tokenSet: TokenSet): Promise<TokenSet> {
    if (tokenSet.expired()) {
      console.log('Token expired, refreshing...');
      return await this.refreshTokenSet(tokenSet);
    }
    console.log('Token is still valid');
    return tokenSet;
  }

  public async verifyIdToken(idToken: string): Promise<jose.JWTVerifyResult> {
    try {
      const publicKey = await this.getPublicKey();
      return await jose.jwtVerify(idToken, publicKey, {
        issuer: this.config.issuer,
        audience: this.config.clientId,
      });
    } catch (error) {
      console.error('Error verifying ID token:', error);
      throw error;
    }
  }
}
