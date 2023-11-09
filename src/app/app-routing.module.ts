import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditIdeaComponent } from './views/edit-idea/edit-idea.component';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'publishIdea', component: EditIdeaComponent },
  { path: 'editIdea/:id', component: EditIdeaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
