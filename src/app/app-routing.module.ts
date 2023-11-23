import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { notLoggedGuard } from './core/guards/not-logged.guard';
import { DetailIdeaComponent } from './views/detail-idea/detail-idea.component';
import { EditIdeaComponent } from './views/edit-idea/edit-idea.component';
import { HomeComponent } from './views/home/home.component';
import { MyIdeasComponent } from './views/my-ideas/my-ideas.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'detailsIdea/:id',
    component: DetailIdeaComponent,
  },
  {
    path: 'publishIdea',
    canActivate: [notLoggedGuard],
    component: EditIdeaComponent,
  },
  {
    path: 'editIdea/:id',
    canActivate: [notLoggedGuard],
    component: EditIdeaComponent,
  },
  {
    path: 'myIdeas',
    canActivate: [notLoggedGuard],
    component: MyIdeasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
