// Tell TypeScript that importing a raw .svg file (without ?url)
// gives back a React functional component. This matches the SVGR webpack rule
// configured in next.config.ts.

declare module "*.svg" {
  import type { FC, SVGProps } from "react";
  const ReactComponent: FC<SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
