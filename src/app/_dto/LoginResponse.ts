export class LoginResponse {
    public token : string;
    public id : number;
    public username : string;
    public email : string;
    public role : string;

    public constructor(
        token : string,
        id : number,
        username : string,
        email : string,
        role : string
    ) {
        this.token = token;
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
    }
}