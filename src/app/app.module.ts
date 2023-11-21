import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {BrowserModule} from '@angular/platform-browser';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {IdeaItemComponent} from './components/idea-item/idea-item.component';
import {IdeasListComponent} from './components/ideas-list/ideas-list.component';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {RegisterFormComponent} from './components/register-form/register-form.component';
import {DetailIdeaComponent} from './views/detail-idea/detail-idea.component';
import {EditIdeaComponent} from './views/edit-idea/edit-idea.component';
import {HomeComponent} from './views/home/home.component';
import {LikesService} from "./core/services/likes.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginFormComponent,
    RegisterFormComponent,
    NavBarComponent,
    IdeasListComponent,
    IdeaItemComponent,
    NavBarComponent,
    EditIdeaComponent,
    DetailIdeaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,
    MatDialogModule,
    MatListModule,
    MatSelectModule,
    HttpClientModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    FormsModule,
  ],
  providers: [LikesService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
