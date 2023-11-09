export class Idea {
    description?: string;
    updated_date?: Date;
    likes?: number;
    title?: string;
    userId?: string;
    topic?: string;
    id?: string;

    [index: string]: any;
    constructor(jsonStr: string) {
        const jsonObj: any = JSON.parse(jsonStr);

        Object.keys(jsonObj).forEach(key => {
            this[key] = jsonObj[key];
        });
    }
}
