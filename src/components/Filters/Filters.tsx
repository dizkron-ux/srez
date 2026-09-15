const groups: Array<[string, string[]]> = [
  ['Стрижка',['Mullet','Curtains','Shag','Mod cut','Textured crop','Buzz cut','Wolf cut','Long fringe']],
  ['Тип волос',['Прямые','Волнистые','Кудрявые','Тонкие']],
  ['Желаемая длина',['Короткая','Средняя','Длинная']],
  ['Стиль',['Классика','Clean','Alternative','Textured']],
  ['Подтверждение',['Есть релевантная работа']],
  ['Где и сколько',['Цена указана']],
];
const checked = new Set(['Mullet','Волнистые','Средняя','Есть релевантная работа']);

export function Filters({ open }: { open: boolean }) {
  return (
    <aside className={`srez-filters ${open ? 'is-open' : ''}`}>
      <div className="srez-filter-head"><span>Фильтры</span><button>Сбросить фильтры</button></div>
      {groups.map(([title, items]) => (
        <div className="srez-filter-group" key={title}>
          <div className="srez-filter-title">{title}</div>
          {items.map(item => <label className="srez-check" key={item}><input type="checkbox" defaultChecked={checked.has(item)} /><span>{item}</span></label>)}
        </div>
      ))}
    </aside>
  );
}
