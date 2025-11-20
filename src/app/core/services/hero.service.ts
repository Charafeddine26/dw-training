import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Hero } from '../models/hero.model';
import heroesData from '../../shared/data.json';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroes: Hero[] = heroesData.map((h: any) => ({
    id: h.id.toString(),
    nom: h.nom,
    nemesis: h.nemesis,
    date_premiere_parution: new Date(h.date_premiere_parution),
    team: h.team || undefined,
    image: h.image,
    labels: h.team ? [h.team] : [],
    isFavorite: false
  }));

  private heroesSubject = new BehaviorSubject<Hero[]>(this.heroes);

  getHeroes(): Observable<Hero[]> {
    return this.heroesSubject.asObservable();
  }

  getHeroById(id: string): Observable<Hero | undefined> {
    return this.getHeroes().pipe(
      map(heroes => heroes.find(h => h.id === id))
    );
  }

  addHero(hero: Partial<Hero>): void {
    const newHero: Hero = {
      ...hero,
      id: Date.now().toString(), // Simple unique ID
      labels: hero.labels || [],
      isFavorite: false
    } as Hero;

    this.heroes = [...this.heroes, newHero];
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

  addLabel(id: string, label: string): void {
    const hero = this.heroes.find(h => h.id === id);
    if (hero) {
      const currentLabels = hero.labels || [];
      if (!currentLabels.includes(label)) {
        this.updateHero({ ...hero, labels: [...currentLabels, label] });
      }
    }
  }
}