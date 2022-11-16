import { EnvironmentModel } from '../app/model/environment/environment.model';
import { defaultEnvironmentConfigurations } from './environment-init';

export const environment: EnvironmentModel = {
  identity: 'production',

  production: true,

  // serverUrl: 'https://oth-server-orchestra-live.herokuapp.com',
  serverUrl: 'https://oth-server-orchestra-dev.herokuapp.com',

  clientUrl: 'https://admin.opentemplatehub.com',

  oauth: defaultEnvironmentConfigurations.oauth,

  payment: defaultEnvironmentConfigurations.payment,

  fileStorage: defaultEnvironmentConfigurations.fileStorage,

  mail: defaultEnvironmentConfigurations.mail,

  sms: defaultEnvironmentConfigurations.sms,

  analytics: {
    googleAnalytics: {
      tag: 'GTM-NNRF845',
      id: ''
    },
    matomo: {
      tag: 'https://opentemplatehub.matomo.cloud',
      id: '3'
    },
    mixPanel: {
      tag: '14e70d2fabca73eaca8d69deb68b48f8',
      id: ''
    }
  }
};
