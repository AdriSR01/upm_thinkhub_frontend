import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  private readonly ideasWithLike = new Map<string, undefined>();

  constructor() {
    const ideasStored = localStorage.getItem('ideasWithLike');

    if (ideasStored !== null) {
      JSON.parse(ideasStored).forEach((ideaId: string) => {
        this.ideasWithLike.set(ideaId, undefined);
      });
    }
  }

  addLike(ideaId: string) {
    this.ideasWithLike.set(ideaId, undefined);

    localStorage.setItem('ideasWithLike', JSON.stringify([...this.ideasWithLike.keys()]));
  }

  hasLike(ideaId: string) {
    return this.ideasWithLike.has(ideaId);
  }

  removeLike(ideaId: string) {
    this.ideasWithLike.delete(ideaId);
  }
}
