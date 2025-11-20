import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Hero } from '../../core/models/hero.model';
import { HeroService } from '../../core/services/hero.service';
import { HeroCardComponent } from '../hero-card/hero-card.component';
import { combineLatest, map, Observable, startWith, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    HeroCardComponent
  ],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss',
})
export class HeroListComponent implements OnInit {
  searchTerm$ = new BehaviorSubject<string>('');
  showFavoritesOnly$ = new BehaviorSubject<boolean>(false);
  
  heroes$: Observable<Hero[]>;

  constructor(private heroService: HeroService) {
    this.heroes$ = combineLatest([
      this.heroService.getHeroes(),
      this.searchTerm$,
      this.showFavoritesOnly$
    ]).pipe(
      map(([heroes, term, showFavorites]) => {
        let filtered = heroes;
        
        // Filter by Nemesis (case insensitive)
        if (term) {
          const lowerTerm = term.toLowerCase();
          filtered = filtered.filter(h => h.nemesis.toLowerCase().includes(lowerTerm));
        }

        // Filter by Favorites
        if (showFavorites) {
          filtered = filtered.filter(h => h.isFavorite);
        }

        return filtered;
      })
    );
  }

  ngOnInit(): void {}

  onSearch(term: string): void {
    this.searchTerm$.next(term);
  }

  toggleFavorite(id: string): void {
    this.heroService.toggleFavorite(id);
  }

  toggleShowFavorites(show: boolean): void {
    this.showFavoritesOnly$.next(show);
  }
}

