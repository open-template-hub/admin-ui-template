import { EnvironmentModel } from '../app/model/environment/environment.model';

export const environment: EnvironmentModel = {
  identity: 'production',

  production: true,

  // TODO: Disabled until heroku issue fixed
  //  serverUrl: 'https://oth-server-orchestra-live.herokuapp.com',
  serverUrl: 'https://oth-server-orchestra-dev.herokuapp.com',

  clientUrl: 'https://admin.opentemplatehub.com',

  oauth: {
    twitter: {
      tag: 'TWITTER'
    },
    google: {
      tag: 'GOOGLE'
    },
    facebook: {
      tag: 'FACEBOOK'
    },
    linkedin: {
      tag: 'LINKEDIN'
    },
    twitch: {
      tag: 'TWITCH'
    },
    github: {
      tag: 'GITHUB'
    },
    dribbble: {
      tag: 'DRIBBBLE'
    },
    reddit: {
      tag: 'REDDIT'
    }
  },

  payment: {
    stripe: {
      tag: 'STRIPE',
      publishableKey: 'pk_test_51I4pFdJslj2vUcp7AkRtYwCPiZJbSvGK7lNFggSbLp9LQopdnUJU44mBKlREonmvszmASnyv4FMxQztzFedllxJO00wg7mHS85',
    },
    coinbase: {
      tag: 'COINBASE'
    },
    paypal: {
      tag: 'PAYPAL',
      clientId: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
      env: 'live'
    }
  },

  fileStorage: {
    aws: {
      tag: 'AWS'
    },
    googleCloud: {
      tag: 'GOOGLE_CLOUD'
    }
  },

  mail: {
    gmail: {
      tag: 'GMAIL'
    },
    yahoo: {
      tag: 'YAHOO'
    },
    outlook: {
      tag: 'OUTLOOK'
    }
  },

  sms: {
    twillio: {
      tag: 'TWILLIO'
    },
    awsSns: {
      tag: 'AWS_SNS'
    }
  },

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
