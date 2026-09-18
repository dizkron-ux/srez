export type DirectoryMaster = {
  id: string;
  name: string;
  specialty: string;
  place: string;
  photo: string;
  rating: number;
  reviewCount: number;
  media: readonly [number, number, number];
  coordinates: readonly [longitude: number, latitude: number];
  collectionIds: readonly string[];
};

const NAMES = [
  'Алексей Орлов', 'Мария Лебедева', 'Тимур Сафиуллин', 'Анна Романова',
  'Илья Крылов', 'Дарья Волкова', 'Никита Белов', 'Софья Морозова',
  'Артём Власов', 'Полина Кузнецова', 'Егор Соколов', 'Алина Макарова',
  'Денис Громов', 'Ксения Фомина', 'Максим Чернов', 'Виктория Зайцева',
  'Кирилл Назаров', 'Екатерина Павлова', 'Павел Котов', 'Елена Тихонова',
  'Роман Борисов', 'Юлия Алексеева', 'Владислав Миронов', 'Ольга Новикова',
  'Михаил Фёдоров', 'Ирина Соловьёва', 'Андрей Логинов', 'Наталья Егорова',
  'Сергей Киселёв', 'Вероника Белова', 'Александр Титов', 'Лилия Воронова',
] as const;

const SPECIALTIES = [
  'Фейды и короткие формы',
  'Удлинённые стрижки',
  'Кудри и естественная текстура',
  'Текстурные формы',
  'Маллет и shag',
  'Классика и taper',
  'Чёлки и средняя длина',
  'Креативные формы',
] as const;

const PLACES = [
  'Сухаревская · Москва',
  'Чистые пруды · Москва',
  'Патриаршие · Москва',
  'Китай-город · Москва',
  'Баррикадная · Москва',
  'Курская · Москва',
  'Хлебозавод · Москва',
  'Бауманская · Москва',
] as const;

const PLACE_COORDINATES = [
  [37.6326, 55.7723],
  [37.6387, 55.7647],
  [37.5907, 55.7652],
  [37.6337, 55.7568],
  [37.5811, 55.7601],
  [37.6598, 55.7587],
  [37.5864, 55.8052],
  [37.6793, 55.7724],
] as const;

const COLLECTION_IDS = [
  ['fades', 'short'],
  ['long'],
  ['curls', 'texture'],
  ['texture'],
  ['mullet-shag', 'long'],
  ['classic', 'fades', 'short'],
  ['fringe', 'long'],
  ['texture'],
] as const;

export const DIRECTORY_MASTERS: readonly DirectoryMaster[] = NAMES.map((name, index) => ({
  id: `master-${index + 1}`,
  name,
  specialty: SPECIALTIES[index % SPECIALTIES.length],
  place: PLACES[index % PLACES.length],
  photo: `https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${index + 20}.jpg`,
  rating: Number((4.7 + (index % 4) * 0.1).toFixed(1)),
  reviewCount: 18 + ((index * 13) % 97),
  media: [index % 16, (index + 5) % 16, (index + 10) % 16],
  coordinates: [
    PLACE_COORDINATES[index % PLACE_COORDINATES.length][0] + ((Math.floor(index / 8) % 2 ? 1 : -1) * Math.floor(index / 8) * 0.006),
    PLACE_COORDINATES[index % PLACE_COORDINATES.length][1] + ((Math.floor(index / 8) % 3) - 1) * 0.005,
  ],
  collectionIds: COLLECTION_IDS[index % COLLECTION_IDS.length],
}));
