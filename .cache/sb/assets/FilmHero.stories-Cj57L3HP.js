import{n as e}from"./rolldown-runtime-2s6bX4vc.js";import{n as t,t as n}from"./FilmHero-CX4ZqJ3d.js";import{n as r,r as i,t as a}from"./storyFrames-DETwqqSC.js";import{l as o,u as s}from"./catalog-SyQ0kYJV.js";var c,l,u,d,f,p,m,h;function g(){return(g=e((()=>{o(),r(),t(),{fn:c}=__STORYBOOK_MODULE_TEST__,l={title:`Film/FilmHero`,component:n,args:{title:s.title,director:s.director,onSubscribe:c(),onRent:c(),onTrailer:c(),onAddToWatchlist:c(),onShare:c()},decorators:[a(`w-[1440px]`)],parameters:{layout:`fullscreen`,design:{type:`figma`,url:`https://www.figma.com/file/bl-mvauqmo6-kg62ml22147e174l`}}},u={},d={args:{directorLabel:`Directed by`,subscribeLabel:`FREE TRIAL`,rentLabel:`Rent - ${s.price}`,muted:!0,onMutedChange:c()}},f={args:{rentLabel:null}},p={decorators:[a(`w-[390px]`)]},m={parameters:{resizable:!0},decorators:[i(900)]},h=[`Default`,`Design`,`SubscriptionOnly`,`Mobile`,`Resizable`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{}`,...u.parameters?.docs?.source},description:{story:`Production labels (Abonnieren, Leihen, Trailer).`,...u.parameters?.docs?.description}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    directorLabel: "Directed by",
    subscribeLabel: "FREE TRIAL",
    rentLabel: \`Rent - \${marieAntoinette.price}\`,
    muted: true,
    onMutedChange: fn()
  }
}`,...d.parameters?.docs?.source},description:{story:`Labels as on the design screen, with the trailer mute toggle.`,...d.parameters?.docs?.description}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    rentLabel: null
  }
}`,...f.parameters?.docs?.source},description:{story:`Not available to rent: subscribe and trailer only.`,...f.parameters?.docs?.description}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  decorators: [frame("w-[390px]")]
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  parameters: {
    resizable: true
  },
  decorators: [resizable(900)]
}`,...m.parameters?.docs?.source}}}})))()}g();export{u as Default,d as Design,p as Mobile,m as Resizable,f as SubscriptionOnly,h as __namedExportsOrder,l as default};