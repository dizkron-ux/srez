export type Screen = 'Home' | 'Haircuts' | 'Look' | 'Catalog' | 'Master' | 'Work' | 'Photo' | 'Favourites';

export type Look = {
  id: string;
  name: string;
  ratio: number;
  colors: [string, string, string];
  description: string;
  fit: string;
};

export type Proof = [label: string, detail: string];

export type PublicLink = {
  label: string;
  value: string;
  url: string;
};

export type Workplace = {
  name: string;
  logo: string;
  address: string;
  mapUrl: string;
  coordinates: readonly [longitude: number, latitude: number];
};

export type Master = {
  name: string;
  place: string;
  shop: string;
  rating: number;
  reviewCount: number;
  bio: string;
  services: string[];
  publicLinks?: PublicLink[];
  workplace?: Workplace;
  proof: Proof[];
  tags: string[];
  media: number[];
};

export type AppState = {
  screen: Screen;
  focus: boolean;
  selectedLookId: string | null;
  selectedCollectionId?: string | null;
  city: boolean;
  showAll: boolean;
  filtersOpen: boolean;
  photoAnalyzed: boolean;
  photoTags: string[];
  saved: boolean;
};
