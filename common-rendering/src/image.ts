// ----- Imports ----- //

import type { ArticleElementRole } from "@guardian/libs";
import type { Option } from "@guardian/types";

// ----- Types ----- //

interface Image {
  src: string;
  srcset: string;
  dpr2Srcset: string;
  alt: Option<string>;
  width: number;
  height: number;
  role: ArticleElementRole;
}

// ----- Exports ----- //

export type { Image };
