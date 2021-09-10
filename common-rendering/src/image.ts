// ----- Imports ----- //

import type { Option, Role } from "@guardian/types";

// ----- Types ----- //

interface Image {
  src: string;
  srcset: string;
  dpr2Srcset: string;
  alt: Option<string>;
  width: number;
  height: number;
  role: Role;
}

// ----- Exports ----- //

export type { Image };
