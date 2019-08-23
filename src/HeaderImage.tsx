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

const HeaderImage = ({ image, caption, credit }) => (
  <div css={headerImageStyle}>
      <img src={image} />
      < HeaderImageCaption caption={caption} credit={credit}/>
  </div>
)

export default HeaderImage;
