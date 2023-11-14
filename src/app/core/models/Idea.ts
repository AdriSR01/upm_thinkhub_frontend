import {User} from "./User";

export class Idea {
  description?: string;
  updated_date?: Date;
  likes?: number;
  title?: string;
  userId?: string;
  user?: User;
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
