export type MasterCollection = {
  id: string;
  title: string;
  masterCount: number;
  media: readonly [number, number, number];
  lookId: string;
};

export const MASTER_COLLECTIONS: readonly MasterCollection[] = [
  { id: 'fades', title: 'Фейды', masterCount: 3, media: [11, 5, 3], lookId: 'taper' },
  { id: 'long', title: 'Удлинённые', masterCount: 3, media: [12, 2, 8], lookId: 'broflow' },
  { id: 'curls', title: 'Кудри', masterCount: 2, media: [9, 6, 1], lookId: 'layers' },
  { id: 'texture', title: 'Текстурные', masterCount: 3, media: [3, 0, 4], lookId: 'crop' },
  { id: 'short', title: 'Короткие', masterCount: 2, media: [5, 13, 11], lookId: 'buzz' },
  { id: 'fringe', title: 'С чёлкой', masterCount: 2, media: [7, 1, 14], lookId: 'fringe' },
  { id: 'mullet-shag', title: 'Маллеты и шэгги', masterCount: 2, media: [0, 4, 6], lookId: 'mullet' },
  { id: 'classic', title: 'Классические', masterCount: 2, media: [10, 15, 8], lookId: 'sidepart' },
];
