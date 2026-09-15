import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { userEvent, within } from 'storybook/test';
import { Button as ButtonComponent } from '../components/Button/Button';
import { CityModal } from '../components/CityModal/CityModal';
import { Evidence as EvidenceComponent } from '../components/Evidence/Evidence';
import { Filters as FiltersComponent } from '../components/Filters/Filters';
import { Header as HeaderComponent } from '../components/Header/Header';
import { LookCard as LookCardComponent } from '../components/LookCard/LookCard';
import { MasterCard as MasterCardComponent } from '../components/MasterCard/MasterCard';
import { LOOKS } from '../data/looks';
import { MASTERS } from '../data/masters';
import type { Master } from '../types';

const meta = {
  title: 'Components',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => {};

function Page({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: '40px 28px 72px' }}>
      <div style={{ marginBottom: 36 }}>
        <div className="srez-eyebrow">COMPONENT</div>
        <h1 style={{ margin: '8px 0 10px', fontFamily: 'var(--display)', fontSize: 48, fontWeight: 400, letterSpacing: '-.045em' }}>{title}</h1>
        <p style={{ maxWidth: 720, margin: 0, color: 'var(--stone)', fontSize: 13, lineHeight: 1.6 }}>{description}</p>
      </div>
      <div style={{ display: 'grid', gap: 34 }}>{children}</div>
    </div>
  );
}

function Section({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <section>
      <div style={{ display: 'flex', gap: 16, alignItems: 'baseline', marginBottom: 14, flexWrap: 'wrap' }}>
        <h2 style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>{title}</h2>
        {note ? <span style={{ color: 'var(--pebble)', fontSize: 11 }}>{note}</span> : null}
      </div>
      {children}
    </section>
  );
}

function Specimen({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <span style={{ color: 'var(--pebble)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '.08em' }}>{label}</span>
      {children}
    </div>
  );
}

const longMaster: Master = {
  ...MASTERS[0],
  name: 'Александр Константинопольский',
  place: 'Очень длинное название барбершопа · Большая Никитская улица, Москва',
  proof: [
    ['Mullet — опубликованная работа', 'Длинное описание подтверждения, которое должно переноситься без поломки сетки.'],
    ...MASTERS[0].proof,
  ],
};

const longEvidenceMaster: Master = {
  ...MASTERS[0],
  proof: [
    ['Mullet — опубликованная работа', 'Подтверждение с длинным описанием источника, чтобы проверить перенос строк, высоту ряда и устойчивость сетки.'],
    ['Профиль', 'Указана работа с текстурными формами и средняя длина.'],
  ],
};

export const Button: Story = {
  render: () => (
    <Page title="Button" description="Основной action-компонент. Варианты, размеры и ключевые состояния собраны на одной странице — отдельные sidebar stories для каждого состояния не создаём.">
      <Section title="Variants">
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <ButtonComponent>Primary</ButtonComponent>
          <ButtonComponent variant="secondary">Secondary</ButtonComponent>
          <ButtonComponent variant="ghost">Ghost</ButtonComponent>
        </div>
      </Section>
      <Section title="Sizes">
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <ButtonComponent size="sm">Small</ButtonComponent>
          <ButtonComponent size="md">Medium</ButtonComponent>
          <ButtonComponent size="lg">Large</ButtonComponent>
        </div>
      </Section>
      <Section title="States" note="Hover и focus выставляются play-функцией; active проверяется интерактивно.">
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <Specimen label="Default"><ButtonComponent>Default</ButtonComponent></Specimen>
          <Specimen label="Hover"><ButtonComponent>Hover</ButtonComponent></Specimen>
          <Specimen label="Focus"><ButtonComponent>Focus</ButtonComponent></Specimen>
          <Specimen label="Disabled"><ButtonComponent disabled>Disabled</ButtonComponent></Specimen>
        </div>
      </Section>
    </Page>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.hover(canvas.getByRole('button', { name: 'Hover' }));
    canvas.getByRole('button', { name: 'Focus' }).focus();
  },
};

export const Header: Story = {
  render: () => (
    <Page title="Header" description="Один публичный компонент навигации. Здесь показаны meaningful product states; responsive проверяется через viewport toolbar и visual QA.">
      <Specimen label="Стрижки active">
        <div style={{ overflow: 'hidden', border: '1px solid var(--line)', borderRadius: 14 }}><HeaderComponent screen="Home" saved={false} go={noop} /></div>
      </Specimen>
      <Specimen label="Мастера active">
        <div style={{ overflow: 'hidden', border: '1px solid var(--line)', borderRadius: 14 }}><HeaderComponent screen="Catalog" saved={false} go={noop} /></div>
      </Specimen>
      <Specimen label="Избранное + saved count">
        <div style={{ overflow: 'hidden', border: '1px solid var(--line)', borderRadius: 14 }}><HeaderComponent screen="Favourites" saved go={noop} /></div>
      </Specimen>
    </Page>
  ),
};

export const Filters: Story = {
  render: () => (
    <Page title="Filters" description="Продуктовый фильтр каталога. Таксономические оси остаются отдельными; состояния не дробятся на sidebar stories.">
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 280px) minmax(220px, 280px)', gap: 28, alignItems: 'start' }}>
        <Specimen label="Open"><FiltersComponent open /></Specimen>
        <Specimen label="Closed"><FiltersComponent open={false} /></Specimen>
      </div>
    </Page>
  ),
};

export const Modal: Story = {
  name: 'Modal',
  render: () => <CityModal open close={noop} save={noop} />,
};

export const LookCard: Story = {
  name: 'Look card',
  render: () => (
    <Page title="Look card" description="Карточка визуального интента. Несколько реальных вариантов показываются вместе; hover/focus доступны прямо в canvas.">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 280px))', gap: 20, alignItems: 'start' }}>
        {LOOKS.slice(0, 3).map((look, index) => <LookCardComponent key={look.name} look={look} index={index} onOpen={noop} />)}
      </div>
    </Page>
  ),
};

export const MasterCard: Story = {
  name: 'Master card',
  render: () => (
    <Page title="Master card" description="Основная карточка специалиста: default, saved и stress-test длинного контента находятся на одной странице.">
      <div style={{ display: 'grid', gap: 24 }}>
        <Specimen label="Default"><MasterCardComponent master={MASTERS[0]} saved={false} onSave={noop} go={noop} /></Specimen>
        <Specimen label="Saved"><MasterCardComponent master={MASTERS[1]} saved onSave={noop} go={noop} /></Specimen>
        <Specimen label="Long content"><MasterCardComponent master={longMaster} saved={false} onSave={noop} go={noop} /></Specimen>
      </div>
    </Page>
  ),
};

export const Evidence: Story = {
  render: () => (
    <Page title="Evidence" description="Подтверждения компетенции показываются как самостоятельный публичный блок, потому что proof — ключевая продуктовая сущность СРЕЗа.">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, alignItems: 'start' }}>
        <Specimen label="Default"><EvidenceComponent master={MASTERS[0]} /></Specimen>
        <Specimen label="Alternate"><EvidenceComponent master={MASTERS[1]} /></Specimen>
        <Specimen label="Long content"><EvidenceComponent master={longEvidenceMaster} /></Specimen>
      </div>
    </Page>
  ),
};
