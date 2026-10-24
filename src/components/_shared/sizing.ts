// Horizontal sizing: a component either fills its parent or hugs its content.
// Fixed widths belong to the story frame, not the component.
export type Sizing = "fill" | "hug";

export const widthClass: Record<Sizing, string> = {
  fill: "w-full min-w-0",
  hug: "w-fit",
};
