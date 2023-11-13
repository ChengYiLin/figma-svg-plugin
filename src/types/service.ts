import type { Options as PrettierOptions } from "prettier";

/**
 * Ref: https://github.com/gregberge/svgr/blob/main/packages/core/src/config.ts
 */
export type SVGRServiceConfig = {
  typescript?: boolean;
  prettier?: boolean;
  prettierConfig?: PrettierOptions;
};
