// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const SERVER_URL = 'http://192.168.0.11:80';

export const environment = {
  production: false,
  SERVER_URL: SERVER_URL,
  MAIN_URL: `${SERVER_URL}/api`,
  USERS_URL: `${SERVER_URL}/api/users`,
  USERS_SIGNUP_URL: `${SERVER_URL}/api/users/signup`,
  USERS_SIGNIN_URL: `${SERVER_URL}/api/users/signin`
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
