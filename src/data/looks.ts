import type { Look } from '../types';

export const LOOKS: Look[] = [
  { id:'mullet', name:'Mullet', ratio:.72, colors:['#c9c5b0','#aebfca','#49555a'], description:'Контрастная форма: короче спереди и по бокам, длина остаётся сзади.', fit:'Если хочется сохранить длину, но сделать форму заметнее.' },
  { id:'mod', name:'Mod cut', ratio:.94, colors:['#c6b6c7','#d7c79e','#5a4f59'], description:'Мягкая объёмная форма средней длины с подвижной челкой и текстурой.', fit:'Если хочется оставить объём и не уходить в короткую форму.' },
  { id:'curtains', name:'Curtains', ratio:1.16, colors:['#b9c8be','#d1b6aa','#58675e'], description:'Форма с удлинённой передней частью и пробором.', fit:'Если хочется сохранить длину спереди.' },
  { id:'crop', name:'Textured crop', ratio:.9, colors:['#b7c1d1','#cbb2a5','#4b5667'], description:'Короткая форма с выраженной текстурой.', fit:'Если нужна короткая стрижка с фактурой.' },
  { id:'shag', name:'Shag', ratio:.69, colors:['#d1b4aa','#b6c6ce','#664c47'], description:'Многослойная форма с движением.', fit:'Если хочется больше объёма и свободы.' },
  { id:'buzz', name:'Buzz cut', ratio:1.22, colors:['#c2c2d2','#d8c7a3','#57576b'], description:'Очень короткая равномерная длина.', fit:'Если хочется максимально коротко.' },
  { id:'wolf', name:'Wolf cut', ratio:.70, colors:['#bcccb5','#ccb5d2','#506149'], description:'Форма между shag и mullet.', fit:'Если хочется заметную форму, но мягче mullet.' },
  { id:'fringe', name:'Long fringe', ratio:.92, colors:['#d6b6bd','#b9c7d6','#664d54'], description:'Форма с удлинённой чёлкой.', fit:'Если хочется оставить длину у лица.' },
  { id:'slick', name:'Slick back', ratio:.96, colors:['#c7c0aa','#b6c8bc','#625d4d'], description:'Удлинённый верх с направлением назад.', fit:'Если нравится гладкая форма.' },
  { id:'layers', name:'Medium layers', ratio:.88, colors:['#b7c4d0','#d2bca6','#52606e'], description:'Средняя длина с мягкими слоями.', fit:'Если хочется сохранить длину.' },
  { id:'sidepart', name:'Side part', ratio:.98, colors:['#c8b8aa','#bbc8cf','#625449'], description:'Собранная форма с боковым пробором.', fit:'Если нужен аккуратный вариант.' },
  { id:'taper', name:'Taper', ratio:.96, colors:['#b9c7b7','#d1b6b1','#536250'], description:'Плавное уменьшение длины у висков.', fit:'Если хочется аккуратнее по краям.' },
  { id:'broflow', name:'Bro flow', ratio:.70, colors:['#c2b7d0','#b9c9bc','#584d67'], description:'Средняя длина с естественным движением.', fit:'Если хочется сохранить длину.' },
  { id:'frenchcrop', name:'French crop', ratio:1.18, colors:['#c9c1ad','#b8c5d0','#615a49'], description:'Короткая форма с плотным верхом.', fit:'Если нужна аккуратная короткая стрижка.' },
  { id:'twoblock', name:'Two block', ratio:.92, colors:['#b7c5c9','#d2b8b4','#4f5f63'], description:'Контраст длины между верхом и боками.', fit:'Если хочется оставить объём сверху.' },
  { id:'quiff', name:'Quiff', ratio:.72, colors:['#d0b7aa','#b9c8d0','#654f46'], description:'Объём спереди вверх и назад.', fit:'Если нравится собранная форма.' },
];
