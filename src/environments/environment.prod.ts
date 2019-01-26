
const SERVER_URL = 'https://legend-chat.herokuapp.com';
export const environment = {
  production: true,

  SERVER_URL: SERVER_URL,
  MAIN_URL: `${SERVER_URL}/api`,
  USERS_URL: `${SERVER_URL}/api/users`,
  USERS_SIGNUP_URL: `${SERVER_URL}/api/users/signup`,
  USERS_SIGNIN_URL: `${SERVER_URL}/api/users/signin`
};

