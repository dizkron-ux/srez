export type Screen = 'Home' | 'Look' | 'Catalog' | 'Master' | 'Work' | 'Photo' | 'Favourites';

export type Look = {
  id: string;
  name: string;
  ratio: number;
  colors: [string, string, string];
  description: string;
  fit: string;
};

export type Proof = [label: string, detail: string];

export type Master = {
  name: string;
  place: string;
  shop: string;
  proof: Proof[];
  tags: string[];
  media: number[];
};

export type AppState = {
  screen: Screen;
  focus: boolean;
  selectedLookId: string | null;
  city: boolean;
  showAll: boolean;
  filtersOpen: boolean;
  photoAnalyzed: boolean;
  photoTags: string[];
  saved: boolean;
};
