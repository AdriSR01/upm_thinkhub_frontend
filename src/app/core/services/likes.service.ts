import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  private readonly ideasWithLike = new Map<string, undefined>();

  private readonly ideasIds: string[] = [];

  constructor() {
    const ideasStored = localStorage.getItem('ideasWithLike');

    if (ideasStored !== null) {
      this.ideasIds = JSON.parse(ideasStored);
      this.ideasIds.forEach((ideaId: string) => {
        this.ideasWithLike.set(ideaId, undefined);
      });
    }
  }

  addLike(ideaId: string) {
    this.ideasWithLike.set(ideaId, undefined);
    this.ideasIds.push(ideaId);

    localStorage.setItem('ideasWithLike', JSON.stringify(this.ideasIds));
  }

  hasLike(ideaId: string) {
    return this.ideasWithLike.has(ideaId);
  }
}
