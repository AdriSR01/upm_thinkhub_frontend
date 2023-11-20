import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators,} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {snackBarConfig} from '../../core/config/snackBarConfig';
import {AuthService} from "../../core/services/auth.service";
import {IdeasService} from "../../core/services/backend/ideas.service";
import {Idea, Topics} from "../../core/models/Idea";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";

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

  idea?: Idea;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private authService: AuthService,
    private ideasService: IdeasService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      topic: new FormControl('', [Validators.required]),
    });

    this.route.paramMap.subscribe((params) => {
      this.isNewIdea = params.get('id') === null;

      if (!this.isNewIdea) {
        this.loading = true;
        this.ideasService.getIdeaById(params.get('id')!).subscribe({
          next: (idea: Idea) => {
            this.idea = idea;
            this.form.controls['title'].setValue(idea.title);
            this.form.controls['description'].setValue(idea.description);
            this.form.controls['topic'].setValue(idea.topic);
          },
          error: (error) => {
            console.log(error);
          }
        }).add(() => {
          this.loading = false;
        });
      }
    });

    this.topics.shift();
  }

  goBack() {
    this.location.back();
  }

  isFormValid() {
    return (
      !this.form.controls['title'].invalid &&
      !this.form.controls['description'].invalid &&
      !this.form.controls['topic'].invalid &&
      (this.isNewIdea ||
        this.form.controls['title'].value.trim() !== this.idea?.title ||
        this.form.controls['description'].value.trim() !== this.idea?.description ||
        this.form.controls['topic'].value !== this.idea?.topic
      )
    );
  }

  onSubmit() {
    const idea: Idea = {
      id: this.idea?.id,
      title: this.form.controls['title'].value,
      topic: this.form.controls['topic'].value,
      description: this.form.controls['description'].value,
      userId: this.authService.user.id,
    };

    this.storeIdea(idea);
  }

  storeIdea(idea: Idea) {
    let observable: Observable<HttpResponse<any>>;

    if (this.isNewIdea) {
      observable = this.ideasService.createIdea(idea);
    } else {
      observable = this.ideasService.updateIdea(idea);
    }

    this.loading = true;
    observable.subscribe({
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
}
