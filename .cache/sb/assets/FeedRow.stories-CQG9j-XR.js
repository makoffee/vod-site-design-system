import{n as e}from"./rolldown-runtime-2s6bX4vc.js";import{l as t}from"./iframe-DOekyo14.js";import{n,r}from"./storyFrames-DETwqqSC.js";import{d as i,i as a,l as o,n as s}from"./catalog-SyQ0kYJV.js";import{n as c,t as l}from"./FilmCard-D9j4VK6w.js";import{n as u,r as d}from"./FeedRow-DVrNClqN.js";var f,p,m,h,g,_,v;function y(){return(y=e((()=>{f=t(),c(),n(),o(),d(),p={title:`Feeds/FeedRow`,component:u,args:{title:`New to Rent`,href:`/channel/new-to-rent`,kind:`tall`,children:null},argTypes:{kind:{control:`inline-radio`,options:[`tall`,`wide`,`square`]}},parameters:{layout:`fullscreen`,design:{type:`figma`,url:`https://www.figma.com/file/bl-mvauqmo6-kg62ml22147e174l`}},decorators:[e=>(0,f.jsx)(`div`,{className:`w-[1392px] p-6`,children:(0,f.jsx)(e,{})})]},m={render:e=>(0,f.jsx)(u,{...e,children:[...a,...i].map(e=>(0,f.jsx)(l,{title:e.title,href:e.href,badge:e.badge??`Exclusive`,rentable:!0,ariaLabel:e.ariaLabel},e.id))})},h={args:{title:`Wide cover feed`,kind:`wide`},render:e=>(0,f.jsx)(u,{...e,children:a.map(e=>(0,f.jsx)(l,{aspect:`wide`,title:e.title,href:e.href,badge:`Exclusive`,rentable:!0},e.id))})},g={args:{title:`Coming Soon`,href:`/channel/coming-soon`},render:e=>(0,f.jsx)(u,{...e,children:s.map(e=>(0,f.jsx)(l,{title:e.title,href:e.href,rentable:e.rentable,availableFrom:e.availableFrom},e.id))})},_={decorators:[r(900)],render:e=>(0,f.jsx)(u,{...e,children:i.map(e=>(0,f.jsx)(l,{title:e.title,href:e.href,rentable:!0},e.id))})},v=[`Tall`,`Wide`,`ComingSoon`,`Resizable`],m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: args => <FeedRow {...args}>
      {[...exclusives, ...newToRent].map(f => <FilmCard key={f.id} title={f.title} href={f.href} badge={f.badge ?? "Exclusive"} rentable ariaLabel={f.ariaLabel} />)}
    </FeedRow>
}`,...m.parameters?.docs?.source},description:{story:`"Tall cover feed": 6 cards at 1392px, the 7th peeks in on wider containers.`,...m.parameters?.docs?.description}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Wide cover feed",
    kind: "wide"
  },
  render: args => <FeedRow {...args}>
      {exclusives.map(f => <FilmCard key={f.id} aspect="wide" title={f.title} href={f.href} badge="Exclusive" rentable />)}
    </FeedRow>
}`,...h.parameters?.docs?.source},description:{story:`"Wide cover feed": 4 stills at 1392px.`,...h.parameters?.docs?.description}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Coming Soon",
    href: "/channel/coming-soon"
  },
  render: args => <FeedRow {...args}>
      {comingSoon.map(f => <FilmCard key={f.id} title={f.title} href={f.href} rentable={f.rentable} availableFrom={f.availableFrom} />)}
    </FeedRow>
}`,...g.parameters?.docs?.source},description:{story:`Production "Coming Soon" row.`,...g.parameters?.docs?.description}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  decorators: [resizable(900)],
  render: args => <FeedRow {...args}>
      {newToRent.map(f => <FilmCard key={f.id} title={f.title} href={f.href} rentable />)}
    </FeedRow>
}`,..._.parameters?.docs?.source},description:{story:`Drag to see 2.3 → 3.5 → 5 → 6 cards per row and the arrows appear from 768px.`,..._.parameters?.docs?.description}}}})))()}y();export{g as ComingSoon,_ as Resizable,m as Tall,h as Wide,v as __namedExportsOrder,p as default};