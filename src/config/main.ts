export class Config {
    //Server port
    public port:number;
    //Secret Key for JWT
    public secret: string;
    //DB connection
    public database: string;

    constructor() {
        this.port = process.env.PORT || 3000;
        this.secret = 'super secret key';
        this.database = 'mongodb://admin:admin@ds147267.mlab.com:47267/noderest';

    }    

};