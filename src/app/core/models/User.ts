export class User {
    email?: string;
    last_name?: string;
    name?: string;
    username?: string;
    password?: string;
    phone_number?: string;
    id?: string;

    [index: string]: any;
    constructor(jsonStr: string) {
        const jsonObj: any = JSON.parse(jsonStr);

        Object.keys(jsonObj).forEach(key => {
            this[key] = jsonObj[key];
        });
    }
}
