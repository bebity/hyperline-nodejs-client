import { Injectable, Logger } from '@nestjs/common';
import { AbstractBasicRepository } from './abstracts/basic-repository.abstract';
import { Analytics } from 'src/namespaces/analytics.namespace';
import { OAuth2 } from 'src/namespaces/o-auth-2.namespace';
// import * as queryString from 'query-string';

@Injectable()
export class OAuth2Repository extends AbstractBasicRepository {
  public base_url = '/v1/oauth';

  public api_type = 'main_api' as const;

  public repository_name: string = OAuth2Repository.name;

  get_user_infos() {
    return this.response(
      this.request<OAuth2.UserInfos>({
        url: `${this.url}/userinfo`,
        method: 'GET',
      }),
    );
  }

  // get_authorization_url(input: OAuth2.GetAuthorizeUrlInput) {
  //   return `${this.url}/authorize?${queryString.stringify(input)}`;
  // }

  generate_token(input: OAuth2.GetAuthTokensInput.Input) {
    return this.response(
      this.request<OAuth2.AuthTokens>({
        url: `${this.url}/token`,
        method: 'POST',
        data: input,
      }),
    );
  }

  revoke_token(input: OAuth2.RevokeTokenInput) {
    return this.response(
      this.request<void>({
        url: `${this.url}/revoke`,
        method: 'POST',
        data: input,
      }),
    );
  }
}
