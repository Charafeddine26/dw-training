export interface Hero {
  id: string;
  name: string;
  nemesis: string;
  firstAppearance: Date;
  team?: string;
  imageUrl?: string;
  labels?: string[];
  isFavorite?: boolean;
}

