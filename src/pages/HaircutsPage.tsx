import { LOOKS } from '../data/looks';
import { Header } from '../components/Header/Header';
import { LookCard } from '../components/LookCard/LookCard';
import { MasterCollectionCarousel } from '../components/MasterCollectionCarousel/MasterCollectionCarousel';
import { MASTER_COLLECTIONS } from '../data/masterCollections';
import type { MasterCollection } from '../data/masterCollections';
import type { AppState, Screen } from '../types';

type Props = {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  go: (screen: Screen) => void;
};

const FEED = Array.from({ length: 32 }, (_, index) => ({
  look: LOOKS[index % LOOKS.length],
  index,
}));

export function HaircutsPage({ state, setState, go }: Props) {
  const selectCollection = (collection: MasterCollection) => {
    setState(current => ({ ...current, selectedLookId: collection.lookId, selectedCollectionId: collection.id }));
  };

  const onOpen = (feedIndex: number) => {
    const item = FEED[feedIndex];
    setState(current => ({ ...current, selectedLookId: item.look.id, selectedCollectionId: null, focus: item.look.id === 'mullet', screen: 'Look' }));
    window.scrollTo(0, 0);
  };

  return (
    <div className="srez-app">
      <Header screen={state.screen} saved={state.saved} go={go} />
      <main className="srez-shell">
        <section className="srez-section srez-haircuts-page">
          <div className="srez-section-title srez-page-head">
            <div><h1 className="srez-page-title">Стрижки</h1></div>
          </div>
          <MasterCollectionCarousel
            collections={MASTER_COLLECTIONS}
            selectedLookId={state.selectedLookId}
            onSelect={selectCollection}
          />
          <div className="cosmos-masonry srez-look-masonry">
            {FEED.map(({ look }, feedIndex) => (
              <LookCard look={look} index={LOOKS.indexOf(look)} onOpen={() => onOpen(feedIndex)} key={`${look.id}-${feedIndex}`} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
