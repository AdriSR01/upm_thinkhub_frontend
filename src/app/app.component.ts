import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterFormComponent } from './components/register-form/register-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public dialog: MatDialog) { }

  openRegisterDialog(): void {
    this.dialog.open(RegisterFormComponent);
  }
}
