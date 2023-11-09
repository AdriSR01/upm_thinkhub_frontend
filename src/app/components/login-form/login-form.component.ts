import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../core/models/User";
import {MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../core/services/auth.service";
import {UsersService} from "../../core/services/backend/users.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  form: FormGroup;

  hidePassword = true;

  constructor(public dialogRef: MatDialogRef<LoginFormComponent>,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private usersService: UsersService) {
    this.form = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  onSubmit() {
    this.usersService.login(this.form.controls['email'].value, this.form.controls['password'].value).subscribe({
      next: (user: User) => {
        this.authService.login(user);
        this.dialogRef.close();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
