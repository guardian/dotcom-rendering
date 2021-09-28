/* eslint-disable import/no-default-export -- exclude stories for this rule */

// ----- Imports ----- //

import { Design, Display, none, Pillar } from "@guardian/types";
import type { FC } from "react";
import { image } from "../fixtures/image";
import { Img } from "./img";

// ----- Setup ----- //

const sizes = { mediaQueries: [], default: "40vw" };

// ----- Stories ----- //

const Default: FC = () => (
  <Img
    image={image}
    sizes={sizes}
    className={none}
    format={{
      design: Design.Article,
      display: Display.Standard,
      theme: Pillar.News,
    }}
    supportsDarkMode={true}
    lightbox={none}
  />
);

const Placeholder: FC = () => (
  <Img
    image={{
      ...image,
      src: "",
      srcset: "",
      dpr2Srcset: "",
    }}
    sizes={sizes}
    className={none}
    format={{
      design: Design.Article,
      display: Display.Standard,
      theme: Pillar.News,
    }}
    supportsDarkMode={true}
    lightbox={none}
  />
);

// ----- Exports ----- //

export default {
  component: Img,
  title: "Common/Components/Img",
  parameters: {
    chromatic: { diffThreshold: 0.25 },
  },
};

export { Default, Placeholder };
