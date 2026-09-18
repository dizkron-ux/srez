import { Button } from '../components/Button/Button';
import { Header } from '../components/Header/Header';
import { Media } from '../components/Media/Media';
import type { AppState, Screen } from '../types';

type Props = { state:AppState; setState:React.Dispatch<React.SetStateAction<AppState>>; go:(screen:Screen)=>void };

export function PhotoPage({ state, setState, go }: Props) {
  const analyzePhoto = () => setState(current => ({ ...current, photoAnalyzed: true }));
  const removeTag = (tag: string) => setState(current => ({
    ...current,
    photoTags: current.photoTags.filter(item => item !== tag),
  }));

  return (
    <div className="srez-app">
      <Header
        screen={state.screen}
        saved={state.saved}
        go={go}
        selectedLook={state.focus ? 'Mullet' : null}
      />
      <main className="srez-shell">
        <section className="srez-photo">
          <h1>Покажи, как хочешь выглядеть</h1>
          <div className="srez-upload">
            <p>Загрузи фото. В MVP анализ ниже имитируется, чтобы проверить сам сценарий до настоящего AI.</p>
            <div className="srez-upload-actions">
              <Button onClick={analyzePhoto}>Выбрать фото</Button>
              <Button variant="secondary" onClick={analyzePhoto}>Использовать пример</Button>
            </div>
          </div>

          {state.photoAnalyzed ? (
            <div className="srez-photo-result">
              <Media index={0} ratioOverride={.72} />
              <div className="srez-photo-analysis">
                <span className="srez-eyebrow">ПРЕДПОЛОЖЕНИЕ</span>
                <h2>Похоже на</h2>
                <p>Проверь признаки. Неправильные можно убрать до поиска.</p>
                <div className="srez-removable">
                  {state.photoTags.map(tag => (
                    <button
                      type="button"
                      className="cosmos-chip"
                      aria-label={`Убрать признак ${tag}`}
                      onClick={() => removeTag(tag)}
                      key={tag}
                    >
                      {tag} ×
                    </button>
                  ))}
                </div>
                <div className="srez-photo-analysis__actions">
                  <Button onClick={() => go('Catalog')}>Найти мастеров</Button>
                </div>
              </div>
            </div>
          ) : null}
        </section>
      </main>
    </div>
  );
}
