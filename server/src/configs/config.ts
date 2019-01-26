export class Config  {

    public static readonly ChatEvents = {
        CONNECT: 'connect',
        MESSAGE: 'message',
        USERINFO: 'userinfo',
        DISCONNECT: 'disconnect',
        USERJOINED: 'userjoined'
    };

    public static readonly ApiRoutes = {
        MAIN_API: '/api',
        USERS_API: '/users'
    }


    public static readonly DEFAULT_PORT = 80;
    public static readonly SECRETJWTSIGN = "askgjlasgjdlasdgsdg[pweoiwe0";
    public static readonly INDEXHTML_PATH= 'D:/morf/SportsLegends/legendchat/dist/legendchat';
}