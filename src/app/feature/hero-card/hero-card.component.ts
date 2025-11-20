import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Hero } from '../../core/models/hero.model';

@Component({
  selector: 'app-hero-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss',
})
export class HeroCardComponent {
  @Input({ required: true }) hero!: Hero;
  @Output() toggleFavorite = new EventEmitter<string>();
  @Output() addLabel = new EventEmitter<string>();

  onToggleFavorite(event: Event): void {
    event.stopPropagation();
    this.toggleFavorite.emit(this.hero.id);
  }

  onAddLabel(event: Event): void {
    event.stopPropagation();
    this.addLabel.emit(this.hero.id);
  }
}
