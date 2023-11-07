import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/core/models/User';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {

  form: FormGroup;

  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    public dialogRef: MatDialogRef<RegisterFormComponent>,
    private formBuilder: FormBuilder,
    private authService: AuthService) {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.minLength(9)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  isFormValid() {
    return !this.form.controls['name'].invalid && !this.form.controls['lastName'].invalid
      && !this.form.controls['email'].invalid && !this.form.controls['phone'].invalid
      && this.isValidPassword();
  }

  onSubmit() {
    const user: User = {
      name: this.form.controls['name'].value,
      lastName: this.form.controls['lastName'].value,
      email: this.form.controls['name'].value,
      phone_number: this.form.controls['phone'].value,
      password: this.form.controls['password'].value
    };

    this.authService.login(user);
    this.dialogRef.close();
  }

  private isValidPassword() {
    if (this.form.controls['password'].invalid || this.form.controls['confirmPassword'].invalid) {
      return false;
    }
    const matchPassword = this.form.controls['password'].value === this.form.controls['confirmPassword'].value;

    if (!matchPassword) {
      this.form.controls['confirmPassword'].setErrors({ 'incorrect': true });
    }

    return matchPassword;
  }

}
