import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-idea',
  templateUrl: './edit-idea.component.html',
  styleUrls: ['./edit-idea.component.scss'],
})
export class EditIdeaComponent {
  form: FormGroup;
  isNewIdea: boolean;
  topics: string[] = [
    'Technological',
    'Industry',
    'Commerce',
    'Environment',
    'Social',
  ];

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.form = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      topic: new FormControl('', [Validators.required]),
    });

    this.isNewIdea = this.router.url === 'publishIdea';
  }

  goBack() {
    this.router.navigate(['']);
  }

  isFormValid() {
    return (
      !this.form.controls['title'].invalid &&
      !this.form.controls['description'].invalid &&
      !this.form.controls['topic'].invalid
    );
  }

  saveIdea() {}
}
