import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  @Output() finishRegister = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService) {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.minLength(9)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  isFormValid() {
    return !this.form.controls['name'].invalid && !this.form.controls['lastName'].invalid
      && !this.form.controls['userName'].invalid && !this.form.controls['email'].invalid
      && !this.form.controls['phone'].invalid && this.isValidPassword();
  }

  onSubmit() {
    const user: User = {
      name: this.form.controls['name'].value,
      lastName: this.form.controls['lastName'].value,
      username: this.form.controls['userName'].value,
      email: this.form.controls['name'].value,
      phone_number: this.form.controls['phone'].value,
      password: this.form.controls['password'].value
    };

    this.authService.login(user);
    this.finishRegister.emit();
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
