import React from 'react';
import { css } from '@emotion/core';
import { basePx, colours, textSans, icons } from '../../styles';

const toggleStyle = css`
  input[type=checkbox] {
    display: none;
  }

  label { 
    line-height: ${basePx(4)};
    text-align: center;
    background-color: ${colours.yellow};
    color: ${colours.black};
    width: ${basePx(4)};
    height: ${basePx(4)};
    display: inline-block;
    position: absolute;
    bottom: ${basePx(1)};
    right: ${basePx(1)};
    border-radius: 100%;
    z-index: 2;
    font-size: 2.8rem;

    &::before {
      ${icons}
      content: "\\e044";
      font-size: 16px;
    }
  }

  label::selection,
  input[type=checkbox]:checked ~ div span::selection {
    background-color: transparent;
  }

  input[type=checkbox] ~ div {
    display: none
  }

  input[type=checkbox]:checked ~ div {
    position: absolute;
    display: block;
    min-height: 44px;
    max-height: 999px;
    background-color: rgba(0, 0, 0, 0.8);
    padding: ${basePx(1)};
    overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding-right: 48px;
    z-index: 1;
    color: ${colours.white};
    line-height: 1.6rem;
    font-size: 1.4rem;
    ${textSans}
  }
`;

interface HeaderImageCaptionProps {
  caption: string;
  credit: string;
}

const HeaderImageCaption = ({ caption, credit }: HeaderImageCaptionProps) => (
  <div css={toggleStyle}>
    <label htmlFor="captionToggle"></label>
    <input type="checkbox" id="captionToggle"/>
    <div>
      <span>{caption}</span>
      <span>&nbsp;</span>
      <span>{credit}</span>
    </div>
  </div>
)

export default HeaderImageCaption;
