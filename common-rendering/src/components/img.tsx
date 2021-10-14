// ----- Imports ----- //

import type { SerializedStyles } from "@emotion/react";
import { css } from "@emotion/react";
import { neutral } from "@guardian/src-foundations/palette";
import type { Format, Option } from "@guardian/types";
import { Design, withDefault } from "@guardian/types";
import type { FC } from "react";
import type { Image } from "../image";
import { darkModeCss } from "../lib";
import type { Lightbox } from "../lightbox";
import { getCaption, getClassName, getCredit } from "../lightbox";
import { sizesAttribute, styles as sizeStyles } from "../sizes";
import type { Sizes } from "../sizes";

// ----- Functions ----- //

const backgroundColour = (format: Format): string => {
  switch (format.design) {
    case Design.Media:
      return neutral[20];
    case Design.Comment:
    case Design.Letter:
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
  format: Format;
  supportsDarkMode: boolean;
  lightbox: Option<Lightbox>;
};

const styles = (
  format: Format,
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
