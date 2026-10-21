// Horizontal sizing in Figma/Brilliant auto-layout terms: an instance either fills its parent or hugs its content.
// Masters are drawn at fixed widths on the design board; that width belongs to the story frame, not the component.
export type Sizing = "fill" | "hug";

export const widthClass: Record<Sizing, string> = {
  fill: "w-full min-w-0",
  hug: "w-fit",
};
