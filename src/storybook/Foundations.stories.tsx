import type { Meta, StoryObj } from '@storybook/react';
import { Icon, type IconName } from '../components/Icon/Icon';

const meta = {
  title: 'Foundations',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const tokens = [
  ['canvas', '--canvas'],
  ['paper', '--paper'],
  ['ink', '--ink'],
  ['stone', '--stone'],
  ['pebble', '--pebble'],
  ['accent', '--accent'],
];

const iconNames: IconName[] = [
  'search',
  'image',
  'arrow-right',
  'arrow-left',
  'arrow-up-right',
  'heart',
  'heart-filled',
  'close',
  'chevron-down',
];

export const Tokens: Story = {
  render: () => (
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gap: 42 }}>
      <header>
        <div className="srez-eyebrow">FOUNDATIONS</div>
        <h1 style={{ margin: '8px 0 10px', fontFamily: 'var(--display)', fontSize: 48, fontWeight: 400, letterSpacing: '-.045em' }}>Design tokens</h1>
        <p style={{ maxWidth: 720, margin: 0, color: 'var(--stone)', fontSize: 13, lineHeight: 1.6 }}>Базовые визуальные решения СРЕЗа. Цвет, типографика, радиусы и ритм держим на одной странице вместо отдельных мелких stories.</p>
      </header>

      <section>
        <h2 style={{ margin: '0 0 14px', fontSize: 14 }}>Color</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 16 }}>
          {tokens.map(([name, token]) => (
            <div key={name}>
              <div style={{ height: 96, borderRadius: 12, border: '1px solid var(--line)', background: `var(${token})` }} />
              <div style={{ marginTop: 8, fontSize: 12 }}><strong>{name}</strong><br /><code>{token}</code></div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 style={{ margin: '0 0 14px', fontSize: 14 }}>Typography</h2>
        <div style={{ display: 'grid', gap: 24 }}>
          <div>
            <span className="srez-eyebrow">DISPLAY</span>
            <div style={{ maxWidth: 900, fontFamily: 'var(--display)', fontSize: 'clamp(48px,7vw,76px)', lineHeight: .94, letterSpacing: '-.055em' }}>Покажи, как хочешь выглядеть</div>
          </div>
          <div>
            <span className="srez-eyebrow">UI</span>
            <p style={{ maxWidth: 620, margin: '8px 0 0', fontFamily: 'var(--ui)', fontSize: 16, lineHeight: 1.55 }}>Основной интерфейсный текст, подписи, кнопки, метаданные и доказательства компетенции мастера.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 style={{ margin: '0 0 14px', fontSize: 14 }}>Shape & spacing</h2>
        <div style={{ display: 'grid', gap: 20 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 110, height: 70, borderRadius: 'var(--radius)', background: 'var(--paper)', border: '1px solid var(--line)' }} />
            <span style={{ fontSize: 12 }}><code>--radius</code></span>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
            {[4, 8, 12, 16, 24, 32].map(value => (
              <div key={value} style={{ display: 'grid', gap: 6, justifyItems: 'center' }}>
                <div style={{ width: 36, height: value * 2, background: 'var(--ink)', opacity: .12 }} />
                <span style={{ fontSize: 10, color: 'var(--pebble)' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  ),
};

export const Icons: Story = {
  render: () => (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <header style={{ marginBottom: 28 }}>
        <div className="srez-eyebrow">FOUNDATIONS</div>
        <h1 style={{ margin: '8px 0 10px', fontFamily: 'var(--display)', fontSize: 48, fontWeight: 400, letterSpacing: '-.045em' }}>Icons</h1>
        <p style={{ maxWidth: 680, margin: 0, color: 'var(--stone)', fontSize: 13, lineHeight: 1.6 }}>Одна галерея для всего набора. Отдельные Search / Heart / Arrow stories в sidebar не создаём.</p>
      </header>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 12 }}>
        {iconNames.map(name => (
          <div key={name} style={{ minWidth: 0, display: 'flex', alignItems: 'center', gap: 10, padding: 14, border: '1px solid var(--line)', borderRadius: 12, background: 'var(--paper)' }}>
            <Icon name={name} size={20} />
            <code style={{ minWidth: 0, overflowWrap: 'anywhere', fontSize: 11 }}>{name}</code>
          </div>
        ))}
      </div>
    </div>
  ),
};
