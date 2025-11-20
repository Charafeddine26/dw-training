export interface Hero {
  id: string;
  nom: string;
  nemesis: string;
  date_premiere_parution: Date;
  team?: string;
  image?: string;
  labels?: string[];
  isFavorite?: boolean;
}
