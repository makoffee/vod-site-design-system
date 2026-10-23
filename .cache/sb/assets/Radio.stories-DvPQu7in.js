import{n as e}from"./rolldown-runtime-2s6bX4vc.js";import{l as t}from"./iframe-DOekyo14.js";import{n,r,t as i}from"./storyFrames-DETwqqSC.js";import{n as a,t as o}from"./ChoiceField-Fh7QxBTq.js";function s(e){return(0,c.jsx)(o,{...e,type:`radio`,boundaryClassName:`size-9 rounded-full`,control:(0,c.jsx)(`span`,{className:`flex size-6 items-center justify-center rounded-full border border-gray-500 bg-white/10 group-has-checked/choice:bg-sooner-primary group-has-disabled/choice:border-gray-500/25 group-has-disabled/choice:bg-white/4 group-has-disabled/choice:group-has-checked/choice:bg-gray-800`,children:(0,c.jsx)(`span`,{className:`hidden size-2.5 rounded-full bg-white group-has-checked/choice:block group-has-disabled/choice:bg-gray-500`})})})}var c;function l(){return(l=e((()=>{c=t(),a(),s.__docgenInfo={description:``,methods:[],displayName:`Radio`,props:{label:{required:!0,tsType:{name:`ReactNode`},description:``},description:{required:!1,tsType:{name:`ReactNode`},description:``},onCheckedChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(checked: boolean) => void`,signature:{arguments:[{type:{name:`boolean`},name:`checked`}],return:{name:`void`}}},description:``},state:{required:!1,tsType:{name:`union`,raw:`"default" | "focus" | "disabled"`,elements:[{name:`literal`,value:`"default"`},{name:`literal`,value:`"focus"`},{name:`literal`,value:`"disabled"`}]},description:`focus pins the focus ring for documentation; real focus uses :focus-visible.`},width:{required:!1,tsType:{name:`union`,raw:`"fill" | "hug"`,elements:[{name:`literal`,value:`"fill"`},{name:`literal`,value:`"hug"`}]},description:`fill (default) stretches the row to the parent; hug fits control + label.`}},composes:[`Omit`]}})))()}var u,d,f,p,m,h,g,_,v,y,b,x,S;function C(){return(C=e((()=>{u=t(),l(),n(),{fn:d}=__STORYBOOK_MODULE_TEST__,f={title:`Components/Radio`,component:s,args:{label:`Monatliche Abrechnung`,description:`7,99€ pro Monat · jederzeit kündbar.`,checked:!1,state:`default`,onCheckedChange:d()},argTypes:{checked:{control:`boolean`},state:{control:`inline-radio`,options:[`default`,`focus`,`disabled`]}},decorators:[i(`w-[364px]`)],parameters:{design:{type:`figma`,url:`https://www.figma.com/file/bl-mvauqmo6-kg62ml22147e174l`}}},p={},m={args:{state:`focus`}},h={args:{state:`disabled`}},g={args:{checked:!0}},_={args:{checked:!0,state:`focus`}},v={args:{checked:!0,state:`disabled`}},y={args:{checked:void 0,defaultChecked:!1}},b={render:()=>(0,u.jsxs)(`fieldset`,{className:`flex flex-col gap-2`,children:[(0,u.jsx)(`legend`,{className:`sr-only`,children:`Abrechnung`}),(0,u.jsx)(s,{name:`billing`,value:`monthly`,defaultChecked:!0,label:`Monatliche Abrechnung`,description:`7,99€ pro Monat · jederzeit kündbar.`}),(0,u.jsx)(s,{name:`billing`,value:`yearly`,label:`Jährliche Abrechnung`,description:`59,95€ pro Jahr · 38 % sparen.`})]})},x={args:{checked:!0},parameters:{resizable:!0},decorators:[r(364)]},S=[`UncheckedDefault`,`UncheckedFocus`,`UncheckedDisabled`,`CheckedDefault`,`CheckedFocus`,`CheckedDisabled`,`Interactive`,`Group`,`Resizable`],p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    state: "focus"
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    state: "disabled"
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    checked: true
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    checked: true,
    state: "focus"
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    checked: true,
    state: "disabled"
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    checked: undefined,
    defaultChecked: false
  }
}`,...y.parameters?.docs?.source},description:{story:`Uncontrolled: click to toggle.`,...y.parameters?.docs?.description}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <fieldset className="flex flex-col gap-2">
      <legend className="sr-only">Abrechnung</legend>
      <Radio name="billing" value="monthly" defaultChecked label="Monatliche Abrechnung" description="7,99€ pro Monat · jederzeit kündbar." />
      <Radio name="billing" value="yearly" label="Jährliche Abrechnung" description="59,95€ pro Jahr · 38 % sparen." />
    </fieldset>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    checked: true
  },
  parameters: {
    resizable: true
  },
  decorators: [resizable(364)]
}`,...x.parameters?.docs?.source},description:{story:`Rows fill their container by default; width="hug" fits control and label.`,...x.parameters?.docs?.description}}}})))()}C();export{g as CheckedDefault,v as CheckedDisabled,_ as CheckedFocus,b as Group,y as Interactive,x as Resizable,p as UncheckedDefault,h as UncheckedDisabled,m as UncheckedFocus,S as __namedExportsOrder,f as default};