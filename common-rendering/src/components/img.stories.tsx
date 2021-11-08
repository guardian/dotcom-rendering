/* eslint-disable import/no-default-export -- exclude stories for this rule */

// ----- Imports ----- //

import { ArticleDesign, ArticleDisplay, ArticlePillar } from "@guardian/libs";
import { none } from "@guardian/types";
import type { FC } from "react";
import { image } from "../fixtures/image";
import Img from "./img";

// ----- Setup ----- //

const sizes = { mediaQueries: [], default: "40vw" };

// ----- Stories ----- //

const Default: FC = () => (
  <Img
    image={image}
    sizes={sizes}
    className={none}
    format={{
      design: ArticleDesign.Standard,
      display: ArticleDisplay.Standard,
      theme: ArticlePillar.News,
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
      design: ArticleDesign.Standard,
      display: ArticleDisplay.Standard,
      theme: ArticlePillar.News,
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
