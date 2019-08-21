import React from 'react';
import { css } from '@emotion/core'

import HeaderImageCaption from './HeaderImageCaption';

const headerImageStyle = css`
    position: relative;
    img {
        width: 100%;
    }
`;

const HeaderImage = () => (
  <div css={headerImageStyle}>
      <img src="https://i.guim.co.uk/img/media/9c208eaabb211863fef64e56fd610b22df756afb/71_0_722_433/master/722.jpg?width=300&quality=85&auto=format&fit=max&s=66937937dbe5db0acf77da3ec98fb0c2" />
      < HeaderImageCaption />
  </div>
)

export default HeaderImage;
