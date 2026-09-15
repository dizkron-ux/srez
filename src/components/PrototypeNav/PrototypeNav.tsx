import type { Screen } from '../../types';

const screens: Screen[] = ['Home','Catalog','Master','Work','Photo','Favourites'];

type Props = { screen: Screen; go: (screen: Screen) => void };

export function PrototypeNav({ screen, go }: Props) {
  return (
    <div className="preview-nav" id="previewNav">
      {screens.map(item => <button key={item} className={item === screen ? 'active' : ''} onClick={() => go(item)}>{item}</button>)}
    </div>
  );
}
