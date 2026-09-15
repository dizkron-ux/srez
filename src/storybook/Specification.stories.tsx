import type { Meta, StoryObj } from '@storybook/react';

const meta = { title:'Documentation/Service specification', parameters:{layout:'padded'} } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const rows = [
  ['Home','default · focus selected · all looks · city modal'],
  ['Catalog','default · filters open · saved · mobile'],
  ['Master','default · saved · mobile'],
  ['Work','default · mobile via responsive QA'],
  ['Photo','before analysis · analyzed · no tags · mobile'],
  ['Favourites','empty · saved'],
];

const components = ['Header','Button','Icon','SearchComposer','RegionSelector','ContextLine','LookCard','FocusBlock','MasterCard','SaveButton','Evidence','Filters','CityModal','Media','PrototypeNav'];

export const ScreenStateMatrix: Story = { render: () => <div style={{maxWidth:920}}><h1 style={{fontFamily:'var(--display)',fontWeight:400}}>Screen state matrix</h1><table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}><tbody>{rows.map(([screen,states]) => <tr key={screen}><th style={{textAlign:'left',padding:'12px 0',borderBottom:'1px solid var(--line)',width:180}}>{screen}</th><td style={{padding:'12px 0',borderBottom:'1px solid var(--line)',color:'var(--stone)'}}>{states}</td></tr>)}</tbody></table></div> };
export const ComponentInventory: Story = { render: () => <div style={{maxWidth:920}}><h1 style={{fontFamily:'var(--display)',fontWeight:400}}>Reusable component inventory</h1><div style={{display:'flex',gap:8,flexWrap:'wrap'}}>{components.map(item => <span className="cosmos-chip" key={item}>{item}</span>)}</div><p style={{marginTop:24,color:'var(--stone)',lineHeight:1.6}}>Every production component should have a Storybook story for its meaningful visual states. Page-only composition belongs under Screens. Product logic gaps are documented in docs/SERVICE_SPEC.md and docs/VISUAL_QA_AUDIT.md.</p></div> };
export const KnownPrototypeGaps: Story = { render: () => <div style={{maxWidth:760,lineHeight:1.6}}><h1 style={{fontFamily:'var(--display)',fontWeight:400}}>Known prototype gaps</h1><ul><li>Search input is not connected to real filtering or ranking.</li><li>Filter reset and checkbox changes are not connected to result data.</li><li>Saved state is one global boolean and is not persisted, despite current favourite-screen copy.</li><li>Master and work routes use the first test master rather than a selected entity id.</li><li>Loading, network error, no-results, missing-evidence and media-error states are not implemented yet.</li><li>City modal does not persist the entered city or trap focus.</li></ul></div> };
