import * as BASEMAPS from '@carto/react-basemaps';
import { API_VERSIONS } from '@deck.gl/carto';

export const initialState = {
  viewState: {
    latitude: 10,
    longitude: 5,
    zoom: 1.5,
    pitch: 0,
    bearing: 0,
    dragRotate: false,
  },
  basemap: BASEMAPS.GOOGLE_CUSTOM,
  credentials: {
    apiVersion: API_VERSIONS.V3,
    apiBaseUrl: 'https://gcp-us-east1.api.carto.com',
  },
  googleApiKey: '<API_KEY>', 
  googleMapId: '47a6b26c0a4b9261', 
  oauth: {
    domain: 'auth.carto.com',
    // Type here your application client id
    clientId: '<CLIENT_ID>',
    scopes: [
      'read:current_user',
      'update:current_user',
      'read:connections',
      'write:connections',
      'read:maps',
      'write:maps',
      'read:account',
      'admin:account',
    ],
    audience: 'carto-cloud-native-api',
    authorizeEndPoint: 'https://carto.com/oauth2/authorize', // only valid if keeping https://localhost:3000/oauthCallback
  },
};
