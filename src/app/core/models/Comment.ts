export class Comment {
  comment?: string;
  timeSince?: string;

  [index: string]: any;

  constructor(jsonStr: string) {
    const jsonObj: any = JSON.parse(jsonStr);

    Object.keys(jsonObj).forEach(key => {
      this[key] = jsonObj[key];
    });
  }
}
