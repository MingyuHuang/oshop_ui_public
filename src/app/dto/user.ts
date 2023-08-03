import { Role } from "./role";

export class User {

    id!: string;
    appUserName!: string;
    password!: string;
    token!: string;
    roles!: Role[];

    constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }

    isAdmin(): boolean {

        for (let role of this.roles) {
            if ('ADMIN' === role.name) {
                return true;
            }
        }
        return false;
    }

}