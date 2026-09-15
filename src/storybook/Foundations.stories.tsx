import type { Meta, StoryObj } from '@storybook/react';

const meta = { title:'Foundations/Visual system', parameters:{layout:'padded'} } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const tokens = [
  ['canvas','--canvas'],['paper','--paper'],['ink','--ink'],['stone','--stone'],['pebble','--pebble'],['accent','--accent'],
];

export const Colors: Story = { render: () => <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:16}}>{tokens.map(([name,token]) => <div key={name}><div style={{height:96,borderRadius:12,border:'1px solid var(--line)',background:`var(${token})`}}/><div style={{marginTop:8,fontSize:12}}><strong>{name}</strong><br/><code>{token}</code></div></div>)}</div> };
export const Typography: Story = { render: () => <div style={{display:'grid',gap:24,maxWidth:900}}><div><span className="srez-eyebrow">DISPLAY</span><div style={{fontFamily:'var(--display)',fontSize:72,lineHeight:.94,letterSpacing:'-.055em'}}>Покажи, как хочешь выглядеть</div></div><div><span className="srez-eyebrow">UI</span><p style={{fontFamily:'var(--ui)',fontSize:16,lineHeight:1.55,maxWidth:620}}>Основной интерфейсный текст, подписи, кнопки, метаданные и доказательства компетенции мастера.</p></div></div> };
export const ShapeAndSpacing: Story = { render: () => <div style={{display:'grid',gap:24}}><div style={{display:'flex',gap:12,alignItems:'center'}}><div style={{width:110,height:70,borderRadius:'var(--radius)',background:'var(--paper)',border:'1px solid var(--line)'}}/><span>radius: var(--radius)</span></div><div style={{display:'flex',gap:8,alignItems:'flex-end'}}>{[4,8,12,16,24,32].map(v => <div key={v} style={{width:36,height:v*2,background:'var(--ink)',opacity:.12}} title={`${v}px`}/>)}</div><p style={{color:'var(--stone)',fontSize:12}}>Target responsive widths for QA: 320, 375, 414, 768, 1280, 1440 px.</p></div> };
