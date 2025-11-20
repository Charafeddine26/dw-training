import { Component, OnInit, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { HeroService } from '../../core/services/hero.service';
import { Hero } from '../../core/models/hero.model';
import { take } from 'rxjs';

@Component({
  selector: 'app-hero-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.scss'
})
export class HeroFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private heroService = inject(HeroService);
  private router = inject(Router);

  @Input() id?: string;

  heroForm!: FormGroup;
  isEditMode = false;

  ngOnInit(): void {
    this.initForm();
    if (this.id) {
      this.isEditMode = true;
      this.loadHero(this.id);
    }
  }

  private initForm(): void {
    this.heroForm = this.fb.group({
      nom: ['', Validators.required],
      nemesis: ['', Validators.required],
      team: [''],
      date_premiere_parution: [new Date(), Validators.required],
      image: [''],
      labels: [[]]
    });
  }

  private loadHero(id: string): void {
    this.heroService.getHeroById(id)
      .pipe(take(1))
      .subscribe(hero => {
        if (hero) {
          this.heroForm.patchValue({
            nom: hero.nom,
            nemesis: hero.nemesis,
            team: hero.team,
            date_premiere_parution: hero.date_premiere_parution,
            image: hero.image,
            labels: hero.labels || []
          });
        } else {
          this.router.navigate(['/']);
        }
      });
  }

  addLabel(event: any): void {
    const value = (event.value || '').trim();
    if (value) {
      const currentLabels = this.heroForm.get('labels')?.value || [];
      this.heroForm.patchValue({ labels: [...currentLabels, value] });
    }
    event.chipInput!.clear();
  }

  removeLabel(label: string): void {
    const currentLabels = this.heroForm.get('labels')?.value || [];
    const index = currentLabels.indexOf(label);
    if (index >= 0) {
      const newLabels = [...currentLabels];
      newLabels.splice(index, 1);
      this.heroForm.patchValue({ labels: newLabels });
    }
  }

  onSubmit(): void {
    if (this.heroForm.invalid) return;

    const formValue = this.heroForm.value;

    if (this.isEditMode && this.id) {
      this.heroService.getHeroById(this.id)
        .pipe(take(1))
        .subscribe(original => {
          if (original) {
            const updatedHero: Hero = {
              ...original,
              ...formValue
            };

            this.heroService.updateHero(updatedHero);
            this.router.navigate(['/']);
          }
        });
    } else {
      this.heroService.addHero(formValue);
      this.router.navigate(['/']);
    }
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}