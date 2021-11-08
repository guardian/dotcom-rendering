/* eslint-disable import/no-default-export -- exclude stories for this rule */

// ----- Imports ----- //

import { ArticleDesign, ArticleDisplay, ArticlePillar} from "@guardian/libs";
import { some } from "@guardian/types";
import type { FC } from "react";
import FigCaption from "./figCaption";

// ----- Stories ----- //

const Default: FC = () => (
  <FigCaption
    format={{
      design: ArticleDesign.Standard,
      display: ArticleDisplay.Standard,
      theme: ArticlePillar.News,
    }}
    supportsDarkMode={true}
  >
    {some(
      "Age of the train … a tourist train in Switzerland. Photograph: Kisa_Markiza/Getty Images"
    )}
  </FigCaption>
);

// ----- Exports ----- //

export default {
  component: FigCaption,
  title: "Common/Components/FigCaption",
};

export { Default };
