import React from 'react';
import { css } from '@emotion/core'

import HeaderImageCaption from './HeaderImageCaption';

const headerImageStyle = css`
    position: relative;
    img {
        width: 100%;
        display: block;
    }
`;

interface HeaderImageProps {
    image: string;
    caption: string;
    credit: string;
}

const HeaderImage = ({ image, caption, credit }: HeaderImageProps) => (
  <div css={headerImageStyle}>
      <img src={image} />
      < HeaderImageCaption caption={caption} credit={credit}/>
  </div>
)

export default HeaderImage;
