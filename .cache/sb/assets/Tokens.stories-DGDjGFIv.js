import{n as e}from"./rolldown-runtime-2s6bX4vc.js";import{l as t}from"./iframe-DOekyo14.js";var n,r,i,a,o,s,c,l,u;function d(){return(d=e((()=>{n=t(),r={title:`Foundations/Tokens`,parameters:{layout:`padded`,design:{type:`figma`,url:`https://www.figma.com/file/bl-mvauqmo6-kg62ml22147e174l`},docs:{description:{component:`Visual check that the default.ds tokens resolve through globals.css (production class names).`}}}},i=[[`color.sooner.primary`,`bg-sooner-primary`],[`color.sooner.primary-light`,`bg-sooner-primary-light`],[`color.sooner.primary-dark`,`bg-sooner-primary-dark`],[`color.background.canvas`,`bg-black`],[`color.surface.uni`,`bg-surface-uni`],[`color.surface.muted`,`bg-gray-100`],[`color.surface.glass`,`bg-white/10`],[`color.surface.glass-hover`,`bg-white/20`],[`color.surface.scrim /50`,`bg-black/50`],[`color.surface.scrim /75`,`bg-black/75`],[`color.surface.scrim /80`,`bg-black/80`],[`color.border.subtle`,`bg-white/10`],[`color.border.decorative`,`bg-border-decorative`],[`color.border.control`,`bg-gray-500`],[`color.text.primary`,`bg-white`],[`color.text.secondary`,`bg-gray-200`],[`color.text.muted`,`bg-white/60`],[`color.text.subtle`,`bg-white/40`],[`color.text.inverse`,`bg-gray-900`],[`color.status.success`,`bg-green-500`],[`color.status.error`,`bg-red-500`],[`color.status.warning`,`bg-yellow-400`]],a=[[`sm · 4`,`rounded-sm`],[`md · 6`,`rounded-md`],[`lg · 8`,`rounded-lg`],[`sooner · 10`,`rounded-sooner`],[`xl · 12`,`rounded-xl`],[`2xl · 16`,`rounded-2xl`],[`3xl · 24`,`rounded-3xl`],[`full`,`rounded-full`]],o=[[`display.hero`,`font-display text-display-hero`,`Kino, kuratiert`],[`display.section`,`font-display text-display-section`,`Neu auf Sooner`],[`display.section-mobile`,`font-display text-display-section-mobile`,`Neu auf Sooner`],[`heading.section`,`text-heading-section`,`Unsere Empfehlungen`],[`heading.plan`,`text-heading-plan uppercase`,`Jahresabo`],[`button.cta`,`text-button-cta uppercase`,`Jetzt testen`],[`button.sm`,`text-button-sm uppercase`,`Sign up`],[`label`,`text-label uppercase`,`Flexibel`],[`nav.tab`,`text-nav-tab uppercase`,`Discover`],[`nav.action`,`text-nav-action uppercase`,`Login`]],s={render:()=>(0,n.jsx)(`div`,{className:`grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4`,children:i.map(([e,t])=>(0,n.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,n.jsx)(`div`,{className:`h-16 rounded-lg bg-[conic-gradient(#333_25%,#222_0_50%,#333_0_75%,#222_0)] bg-[length:16px_16px]`,children:(0,n.jsx)(`div`,{className:`size-full rounded-lg border border-white/10 ${t}`})}),(0,n.jsx)(`span`,{className:`text-sm text-gray-200`,children:e}),(0,n.jsx)(`code`,{className:`text-xs text-white/60`,children:t})]},e))})},c={render:()=>(0,n.jsx)(`div`,{className:`flex flex-wrap gap-6`,children:a.map(([e,t])=>(0,n.jsxs)(`div`,{className:`flex flex-col items-center gap-2`,children:[(0,n.jsx)(`div`,{className:`size-20 bg-sooner-primary ${t}`}),(0,n.jsx)(`span`,{className:`text-sm text-gray-200`,children:e})]},e))})},l={render:()=>(0,n.jsx)(`div`,{className:`flex flex-col gap-6`,children:o.map(([e,t,r])=>(0,n.jsxs)(`div`,{className:`flex flex-col gap-1`,children:[(0,n.jsxs)(`span`,{className:`text-xs text-white/60`,children:[`typography.`,e,` · `,(0,n.jsx)(`code`,{children:t})]}),(0,n.jsx)(`span`,{className:t,children:r})]},e))})},u=[`Colors`,`Radii`,`Typography`],s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
      {colors.map(([name, cls]) => <div key={name} className="flex flex-col gap-2">
          {/* Checkerboard behind the swatch so translucent tokens are visible */}
          <div className="h-16 rounded-lg bg-[conic-gradient(#333_25%,#222_0_50%,#333_0_75%,#222_0)] bg-[length:16px_16px]">
            <div className={\`size-full rounded-lg border border-white/10 \${cls}\`} />
          </div>
          <span className="text-sm text-gray-200">{name}</span>
          <code className="text-xs text-white/60">{cls}</code>
        </div>)}
    </div>
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-6">
      {radii.map(([name, cls]) => <div key={name} className="flex flex-col items-center gap-2">
          <div className={\`size-20 bg-sooner-primary \${cls}\`} />
          <span className="text-sm text-gray-200">{name}</span>
        </div>)}
    </div>
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-6">
      {typeRoles.map(([name, cls, sample]) => <div key={name} className="flex flex-col gap-1">
          <span className="text-xs text-white/60">
            typography.{name} · <code>{cls}</code>
          </span>
          <span className={cls}>{sample}</span>
        </div>)}
    </div>
}`,...l.parameters?.docs?.source}}}})))()}d();export{s as Colors,c as Radii,l as Typography,u as __namedExportsOrder,r as default};