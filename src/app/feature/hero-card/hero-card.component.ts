import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Hero } from '../../core/models/hero.model';
import { HeroService } from '../../core/services/hero.service';

@Component({
  selector: 'app-hero-card',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss',
})
export class HeroCardComponent {
  @Input({ required: true }) hero!: Hero;
  @Output() toggleFavorite = new EventEmitter<string>();
  @Output() addLabel = new EventEmitter<string>();

  private heroService = inject(HeroService);

  onToggleFavorite(event: Event): void {
    event.stopPropagation();
    this.toggleFavorite.emit(this.hero.id);
  }

  onAddLabel(event: Event): void {
    event.stopPropagation();
    this.addLabel.emit(this.hero.id);
  }

  onDelete(event: Event): void {
    event.stopPropagation();
    if (confirm(`Are you sure you want to delete ${this.hero.nom}?`)) {
      this.heroService.deleteHero(this.hero.id);
    }
  }
}