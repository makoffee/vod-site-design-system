import nodes from "@/figma-nodes.json";

// Story-only helper: the Design tab link to a component or screen in the Sooner Figma file.
// src/figma-nodes.json maps names to node ids and is regenerated after each Figma sync.

const url = (id: string) => `https://www.figma.com/design/${nodes.file}/sooner.de-rebrand?node-id=${id.replace(":", "-")}`;

/** Design tab parameters for a component (by its name in Figma, which is the React component name). */
export function figmaComponent(name: keyof typeof nodes.components) {
  return { design: { type: "figma", url: url(nodes.components[name]) } };
}

/** Design tab parameters for a key screen (by its frame name in Figma, e.g. "Discover | desktop"). */
export function figmaScreen(name: keyof typeof nodes.screens) {
  return { design: { type: "figma", url: url(nodes.screens[name]) } };
}
