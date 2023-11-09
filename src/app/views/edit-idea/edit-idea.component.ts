import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Idea } from 'src/app/core/models/Idea';
import { AuthService } from 'src/app/core/services/auth.service';
import { IdeasService } from 'src/app/core/services/backend/ideas.service';

@Component({
  selector: 'app-edit-idea',
  templateUrl: './edit-idea.component.html',
  styleUrls: ['./edit-idea.component.scss'],
})
export class EditIdeaComponent {
  form: FormGroup;
  isNewIdea: boolean = true;
  topics: string[] = [
    'Technological',
    'Industry',
    'Commerce',
    'Environment',
    'Social',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private ideasService: IdeasService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      topic: new FormControl('', [Validators.required]),
    });

    // this.isNewIdea = this.router.url === 'publishIdea';
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

  onSubmit() {
    const idea: Idea = {
      title: this.form.controls['title'].value,
      topic: this.form.controls['topic'].value,
      description: this.form.controls['description'].value,
      // user_id: this.authService.user.id,
      user_id: "a57e99f5-9c05-4b56-b4b0-c6fdd73c266f",
    };

    this.isNewIdea ? this.publishIdea(idea) : this.saveIdea(idea);
  }

  publishIdea(idea: Idea) {
    this.ideasService.createIdea(idea).subscribe({
      next: () => {
        this.snackBar.open("Idea saved successfully", "Dismiss", {
          duration: 3000
        })
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  saveIdea(idea: Idea) {
    // TODO: Save changes of an idea
  }
}