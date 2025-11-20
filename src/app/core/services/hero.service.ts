import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Hero } from '../models/hero.model';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroes: Hero[] = [
    {
      id: '1',
      name: 'Spider-Man',
      nemesis: 'Green Goblin',
      firstAppearance: new Date('1962-08-01'),
      team: 'Avengers',
      imageUrl: 'https://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b.jpg',
      labels: ['Human', 'Spider'],
      isFavorite: false
    },
    {
      id: '2',
      name: 'Iron Man',
      nemesis: 'Mandarin',
      firstAppearance: new Date('1963-03-01'),
      team: 'Avengers',
      imageUrl: 'https://i.annihil.us/u/prod/marvel/i/mg/9/c0/527bb7b37ff55.jpg',
      labels: ['Human', 'Tech'],
      isFavorite: true
    }
  ];

  private heroesSubject = new BehaviorSubject<Hero[]>(this.heroes);

  getHeroes(): Observable<Hero[]> {
    return this.heroesSubject.asObservable();
  }

  addHero(hero: Hero): void {
    this.heroes = [...this.heroes, hero];
    this.heroesSubject.next(this.heroes);
  }

  updateHero(updatedHero: Hero): void {
    this.heroes = this.heroes.map(h => h.id === updatedHero.id ? updatedHero : h);
    this.heroesSubject.next(this.heroes);
  }

  deleteHero(id: string): void {
    this.heroes = this.heroes.filter(h => h.id !== id);
    this.heroesSubject.next(this.heroes);
  }

  toggleFavorite(id: string): void {
    const hero = this.heroes.find(h => h.id === id);
    if (hero) {
      this.updateHero({ ...hero, isFavorite: !hero.isFavorite });
    }
  }
}

