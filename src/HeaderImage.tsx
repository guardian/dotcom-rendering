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

const HeaderImage = () => (
  <div css={headerImageStyle}>
      <img src="https://i.guim.co.uk/img/media/90870ec12d9cb8af47d20a76457c9538e418ad78/0_0_3500_2101/master/3500.jpg?width=1920&quality=85&auto=format&fit=max&s=c499e394a551496ceef740b6d27bb896" />
      < HeaderImageCaption />
  </div>
)

export default HeaderImage;
