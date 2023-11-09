export class User {
    email?: string;
    lastName?: string;
    name?: string;
    password?: string;
    phoneNumber?: string;
    id?: string;

    [index: string]: any;
    constructor(jsonStr: string) {
        const jsonObj: any = JSON.parse(jsonStr);

        Object.keys(jsonObj).forEach(key => {
            this[key] = jsonObj[key];
        });
    }
}
