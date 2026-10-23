import{n as e}from"./rolldown-runtime-2s6bX4vc.js";import{l as t}from"./iframe-DOekyo14.js";import{n,r,t as i}from"./storyFrames-DETwqqSC.js";import{n as a,t as o}from"./ChoiceField-Fh7QxBTq.js";function s(e){return(0,c.jsx)(o,{...e,type:`checkbox`,role:`switch`,boundaryClassName:`h-10 w-[60px] rounded-full`,control:(0,c.jsx)(`span`,{className:`flex h-7 w-12 items-center rounded-full border border-gray-500 bg-white/10 px-[3px] transition-colors group-has-checked/choice:border-sooner-primary group-has-checked/choice:bg-sooner-primary group-has-disabled/choice:border-gray-500/25 group-has-disabled/choice:bg-white/4 group-has-disabled/choice:group-has-checked/choice:border-gray-500/25 group-has-disabled/choice:group-has-checked/choice:bg-gray-800`,children:(0,c.jsx)(`span`,{className:`size-5 rounded-full bg-white transition-transform group-has-checked/choice:translate-x-5 group-has-disabled/choice:bg-gray-200`})})})}var c;function l(){return(l=e((()=>{c=t(),a(),s.__docgenInfo={description:``,methods:[],displayName:`Switch`,props:{label:{required:!0,tsType:{name:`ReactNode`},description:``},description:{required:!1,tsType:{name:`ReactNode`},description:``},onCheckedChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(checked: boolean) => void`,signature:{arguments:[{type:{name:`boolean`},name:`checked`}],return:{name:`void`}}},description:``},state:{required:!1,tsType:{name:`union`,raw:`"default" | "focus" | "disabled"`,elements:[{name:`literal`,value:`"default"`},{name:`literal`,value:`"focus"`},{name:`literal`,value:`"disabled"`}]},description:`focus pins the focus ring for documentation; real focus uses :focus-visible.`},width:{required:!1,tsType:{name:`union`,raw:`"fill" | "hug"`,elements:[{name:`literal`,value:`"fill"`},{name:`literal`,value:`"hug"`}]},description:`fill (default) stretches the row to the parent; hug fits control + label.`}},composes:[`Omit`]}})))()}var u,d,f,p,m,h,g,_,v,y,b;function x(){return(x=e((()=>{l(),n(),{fn:u}=__STORYBOOK_MODULE_TEST__,d={title:`Components/Switch`,component:s,args:{label:`Autoplay`,description:`Trailer automatisch abspielen.`,checked:!1,state:`default`,onCheckedChange:u()},argTypes:{checked:{control:`boolean`},state:{control:`inline-radio`,options:[`default`,`focus`,`disabled`]}},decorators:[i(`w-[420px]`)],parameters:{design:{type:`figma`,url:`https://www.figma.com/file/bl-mvauqmo6-kg62ml22147e174l`}}},f={},p={args:{state:`focus`}},m={args:{state:`disabled`}},h={args:{checked:!0}},g={args:{checked:!0,state:`focus`}},_={args:{checked:!0,state:`disabled`}},v={args:{checked:void 0,defaultChecked:!1}},y={args:{checked:!0},parameters:{resizable:!0},decorators:[r(420)]},b=[`UncheckedDefault`,`UncheckedFocus`,`UncheckedDisabled`,`CheckedDefault`,`CheckedFocus`,`CheckedDisabled`,`Interactive`,`Resizable`],f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    state: "focus"
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    state: "disabled"
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    checked: true
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    checked: true,
    state: "focus"
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    checked: true,
    state: "disabled"
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    checked: undefined,
    defaultChecked: false
  }
}`,...v.parameters?.docs?.source},description:{story:`Uncontrolled: click to toggle.`,...v.parameters?.docs?.description}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    checked: true
  },
  parameters: {
    resizable: true
  },
  decorators: [resizable(420)]
}`,...y.parameters?.docs?.source},description:{story:`Rows fill their container by default; width="hug" fits control and label.`,...y.parameters?.docs?.description}}}})))()}x();export{h as CheckedDefault,_ as CheckedDisabled,g as CheckedFocus,v as Interactive,y as Resizable,f as UncheckedDefault,m as UncheckedDisabled,p as UncheckedFocus,b as __namedExportsOrder,d as default};