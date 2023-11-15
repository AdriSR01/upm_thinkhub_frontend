import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators,} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {snackBarConfig} from '../../core/config/snackBarConfig';
import {AuthService} from "../../core/services/auth.service";
import {IdeasService} from "../../core/services/backend/ideas.service";
import {Idea, Topics} from "../../core/models/Idea";

@Component({
  selector: 'app-edit-idea',
  templateUrl: './edit-idea.component.html',
  styleUrls: ['./edit-idea.component.scss'],
})
export class EditIdeaComponent {
  form: FormGroup;
  isNewIdea: boolean = true;
  topics: string[] = Object.values(Topics);

  loading = false;

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

    this.isNewIdea = this.router.url === '/publishIdea';
    this.topics.shift();
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
      userId: this.authService.user.id,
    };

    this.isNewIdea ? this.publishIdea(idea) : this.saveIdea(idea);
  }

  publishIdea(idea: Idea) {
    this.loading = true;
    this.ideasService.createIdea(idea).subscribe({
      next: () => {
        this.form.reset();
        this.loading = false;
        this.snackBar.open('Idea saved successfully', 'X', {
          ...snackBarConfig,
          panelClass: snackBarConfig.panelClass?.concat('info-snackbar')
        });
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
