import { lazy, Suspense } from 'react';
import { Button } from '../components/Button/Button';
import { Header } from '../components/Header/Header';
import { Icon } from '../components/Icon/Icon';
import { IconButton } from '../components/IconButton/IconButton';
import { SaveButton } from '../components/SaveButton/SaveButton';
import { WorkCard } from '../components/WorkCard/WorkCard';
import { LOOKS } from '../data/looks';
import { MASTERS } from '../data/masters';
import type { AppState, Screen } from '../types';

type Props = { state:AppState; go:(screen:Screen)=>void; onSave:()=>void; toast:(message:string)=>void };

const WorkplaceMap = lazy(() => import('../components/WorkplaceMap/WorkplaceMap').then(module => ({ default: module.WorkplaceMap })));

export function MasterPage({ state, go, onSave, toast }: Props) {
  const master = MASTERS[0];
  const selectedLook = LOOKS.find(look => look.id === state.selectedLookId)?.name ?? null;
  const shareProfile = async () => {
    const shareData = {
      title: `${master.name} — SREZ`,
      text: `Профиль мастера ${master.name} на SREZ`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
      await navigator.clipboard.writeText(shareData.url);
      toast('Ссылка на профиль скопирована');
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      toast('Не удалось скопировать ссылку');
    }
  };
  return (
    <div className="srez-app srez-master-profile-page">
      <Header screen={state.screen} saved={state.saved} go={go} selectedLook={selectedLook} />
      <main className="srez-shell srez-master-profile-shell">
        <div className="srez-master-profile-layout">
          <aside className="srez-master-profile-sidebar" aria-label="Информация о мастере">
            <div className="srez-master-profile-sidebar__inner">
              <div className="srez-master-profile-overview">
                <div className="srez-master-profile-identity srez-page-head">
                  <div className="srez-master-profile-avatar">{master.name.slice(0, 1)}</div>
                  <div className="srez-master-profile-copy">
                    <h1 className="srez-page-title">{master.name}</h1>
                    <div
                      className="srez-master-profile-rating"
                      aria-label={`Рейтинг ${master.rating} из 5, ${master.reviewCount} отзывов`}
                    >
                      <span aria-hidden="true">★</span>
                      <strong>{master.rating.toFixed(1)}</strong>
                      <span>({master.reviewCount})</span>
                    </div>
                    {!master.workplace ? <span>{master.place}</span> : null}
                  </div>
                </div>

                <div className="srez-master-profile-actions">
                  <Button onClick={() => toast('Онлайн-запись пока недоступна в прототипе')}>Перейти к записи</Button>
                  <SaveButton saved={state.saved} onClick={onSave} />
                  <IconButton icon="share" iconSize={18} aria-label="Поделиться профилем" className="srez-profile-share__trigger" onClick={shareProfile} />
                </div>
              </div>

              <div className="srez-master-profile-about">
                <div className="srez-master-profile-about__copy">
                  <span>О мастере</span>
                  <p>{master.bio}</p>
                </div>
                <div className="srez-master-profile-services">
                  <span>Услуги</span>
                  <ul aria-label="Типы услуг">
                    {master.services.map(service => <li key={service}>{service}</li>)}
                  </ul>
                </div>
              </div>

              {master.publicLinks?.length ? (
                <div className="srez-master-profile-presence">
                  <div className="srez-master-profile-links">
                    <span>Публичные ссылки</span>
                    <div>
                      {master.publicLinks.map(link => (
                        <a href={link.url} target="_blank" rel="noreferrer" key={link.label}>
                          <span><small>{link.label}</small>{link.value}</span>
                          <Icon name="arrow-up-right" size={16} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

            </div>
          </aside>

          <div className="srez-master-profile-content">
            <section className="srez-master-profile-works" aria-labelledby="srez-master-works-title">
              <div className="cosmos-section-heading">
                <h2 id="srez-master-works-title">Работы</h2>
                <IconButton icon="sliders" iconSize={18} aria-label="Фильтры работ" className="srez-profile-filters__trigger" onClick={() => toast('Фильтры работ появятся после подключения портфолио')} />
              </div>
              <div className="srez-work-grid">
                {[.82,1.08,.7,1.22,.94,.76,1.12,.86].map((ratio, index) => (
                  <WorkCard index={index} ratio={ratio} onOpen={() => go('Work')} key={index} />
                ))}
              </div>
            </section>

            {master.workplace ? (
              <section className="srez-master-profile-location" aria-labelledby="srez-master-location-title">
                <div className="cosmos-section-heading">
                  <h2 id="srez-master-location-title">Студия</h2>
                </div>
                <div className="srez-master-profile-map" id="srez-workplace-map">
                  <Suspense fallback={<div className="srez-workplace-map is-loading" aria-label="Карта загружается" />}>
                    <WorkplaceMap workplace={master.workplace} />
                  </Suspense>
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
}
