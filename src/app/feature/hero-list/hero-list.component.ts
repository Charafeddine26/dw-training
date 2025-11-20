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
import { combineLatest, map, Observable, BehaviorSubject } from 'rxjs';
import { RouterModule } from '@angular/router';

interface HeroGroup {
  label: string;
  heroes: Hero[];
}

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
    RouterModule,
    MatButtonToggleModule,
    HeroCardComponent
  ],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss',
})
export class HeroListComponent implements OnInit {
  searchTerm$ = new BehaviorSubject<string>('');
  showFavoritesOnly$ = new BehaviorSubject<boolean>(false);
  groupByLabel$ = new BehaviorSubject<boolean>(false);

  heroes$: Observable<Hero[]>;
  groupedHeroes$: Observable<HeroGroup[]>;

  constructor(private heroService: HeroService) {
    // Base filtered list
    this.heroes$ = combineLatest([
      this.heroService.getHeroes(),
      this.searchTerm$,
      this.showFavoritesOnly$
    ]).pipe(
      map(([heroes, term, showFavorites]) => {
        let filtered = heroes;

        // Advanced Search (Name, Nemesis, Team, Labels)
        if (term) {
          const lowerTerm = term.toLowerCase();
          filtered = filtered.filter(h =>
            h.nom.toLowerCase().includes(lowerTerm) ||
            h.nemesis.toLowerCase().includes(lowerTerm) ||
            (h.team && h.team.toLowerCase().includes(lowerTerm)) ||
            (h.labels && h.labels.some(l => l.toLowerCase().includes(lowerTerm)))
          );
        }

        // Filter by Favorites
        if (showFavorites) {
          filtered = filtered.filter(h => h.isFavorite);
        }

        return filtered;
      })
    );

    // Grouped list derived from the filtered list
    this.groupedHeroes$ = this.heroes$.pipe(
      map(heroes => {
        const groups = new Map<string, Hero[]>();
        const unlabeled: Hero[] = [];

        heroes.forEach(hero => {
          if (hero.labels && hero.labels.length > 0) {
            hero.labels.forEach(label => {
              if (!groups.has(label)) {
                groups.set(label, []);
              }
              groups.get(label)?.push(hero);
            });
          } else {
            unlabeled.push(hero);
          }
        });

        const result: HeroGroup[] = [];
        groups.forEach((groupHeroes, label) => {
          result.push({ label, heroes: groupHeroes });
        });

        // Sort groups by label name
        result.sort((a, b) => a.label.localeCompare(b.label));

        // Optionally add "Unlabeled" group at the end
        if (unlabeled.length > 0) {
          result.push({ label: 'No Labels', heroes: unlabeled });
        }

        return result;
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

  toggleGroupByLabel(group: boolean): void {
    this.groupByLabel$.next(group);
  }

  onAddLabel(heroId: string): void {
    const label = prompt('Enter a label for this hero:');
    if (label) {
      this.heroService.addLabel(heroId, label.trim());
    }
  }
}
