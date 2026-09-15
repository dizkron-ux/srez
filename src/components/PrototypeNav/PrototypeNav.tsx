import type { Screen } from '../../types';

const screens: Screen[] = ['Home','Look','Catalog','Master','Work','Favourites'];

type Props = { screen: Screen; go: (screen: Screen) => void };

export function PrototypeNav({ screen, go }: Props) {
  return (
    <nav className="preview-nav" id="previewNav" aria-label="Навигация прототипа">
      {screens.map(item => <button type="button" key={item} className={item === screen ? 'active' : ''} onClick={() => go(item)}>{item}</button>)}
    </nav>
  );
}
