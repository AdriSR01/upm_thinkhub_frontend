import { Comment } from './Comment';
import { User } from './User';

export class Idea {
  description?: string;
  lastModifiedDate?: Date;
  likes?: number;
  title?: string;
  userId?: string;
  user?: User;
  topic?: Topics;
  comments?: Comment[];
  id?: string;

  [index: string]: any;

  constructor(jsonStr: string) {
    const jsonObj: any = JSON.parse(jsonStr);

    Object.keys(jsonObj).forEach((key) => {
      this[key] = jsonObj[key];
    });
  }
}

export enum Topics {
  ALL = 'All',
  TECHNOLOGICAL = 'Technological',
  INDUSTRY = 'Industry',
  COMMERCE = 'Commerce',
  ENVIRONMENT = 'Environment',
  SOCIAL = 'Social',
}
