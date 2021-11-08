// ----- Imports ----- //

import type { SerializedStyles } from "@emotion/react";
import { css } from "@emotion/react";
import { neutral } from "@guardian/src-foundations/palette";
import type { ArticleFormat } from "@guardian/libs";
import { ArticleDesign } from "@guardian/libs";
import type { Option } from "@guardian/types";
import { withDefault } from "@guardian/types";
import type { FC } from "react";
import type { Image } from "../image";
import { darkModeCss } from "../lib";
import type { Lightbox } from "../lightbox";
import { getCaption, getClassName, getCredit } from "../lightbox";
import { sizesAttribute, styles as sizeStyles } from "../sizes";
import type { Sizes } from "../sizes";

// ----- Functions ----- //

const backgroundColour = (format: ArticleFormat): string => {
  switch (format.design) {
    case ArticleDesign.Media:
      return neutral[20];
    case ArticleDesign.Comment:
    case ArticleDesign.Letter:
      return neutral[86];
    default:
      return neutral[97];
  }
};

// ----- Component ----- //

type Props = {
  image: Image;
  sizes: Sizes;
  className: Option<SerializedStyles>;
  format: ArticleFormat;
  supportsDarkMode: boolean;
  lightbox: Option<Lightbox>;
};

const styles = (
  format: ArticleFormat,
  supportsDarkMode: boolean
): SerializedStyles => css`
  background-color: ${backgroundColour(format)};
  color: ${neutral[60]};
  display: block;

  ${darkModeCss(supportsDarkMode)`
        background-color: ${neutral[20]};
    `}
`;

const Img: FC<Props> = ({
  image,
  sizes,
  className,
  format,
  supportsDarkMode,
  lightbox,
}) => (
  <picture>
    <source
      sizes={sizesAttribute(sizes)}
      srcSet={image.dpr2Srcset}
      media="(-webkit-min-device-pixel-ratio: 1.25), (min-resolution: 120dpi)"
    />
    <source sizes={sizesAttribute(sizes)} srcSet={image.srcset} />
    <img
      src={image.src}
      alt={withDefault("")(image.alt)}
      className={getClassName(image.width, lightbox)}
      css={[
        sizeStyles(sizes, image.width, image.height),
        styles(format, supportsDarkMode),
        withDefault<SerializedStyles | undefined>(undefined)(className),
      ]}
      data-ratio={image.height / image.width}
      data-caption={getCaption(lightbox)}
      data-credit={getCredit(lightbox)}
    />
  </picture>
);

// ----- Exports ----- //

export default Img;
