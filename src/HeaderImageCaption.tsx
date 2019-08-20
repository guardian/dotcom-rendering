import React from 'react';
import { css } from '@emotion/core'

const toggleStyle = css`
  input[type=checkbox] {
    display: none;
  }

  label { 
    line-height: 30px;
    text-align: center;
    background-color: #ffe500;
    color: #121212;
    width: 32px;
    height: 32px;
    display: inline-block;
    position: absolute;
    bottom: 6px;
    right: 6px;
    border-radius: 100%;
    z-index: 2;
    font-size: 1.6rem;
  }

  label::selection {
    background-color: transparent;
  }

  input[type=checkbox] ~ div {
    display: none
  }

  input[type=checkbox]:checked ~ div {    
    position: absolute;
    left: 0;
    display: block;
    min-height: 44px;
    max-height: 999px;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 6px 12px 12px 12px;
    max-height: 0;
    overflow: hidden;
    position: absolute;
    right: 0;
    bottom: 0;
    right: 0;
    padding-right: 48px;
    z-index: 1;
    line-height: 1.6rem;
    color: #ffffff;
    font-family: sans-serif;
  }
`;

const HeaderImageCaption = () => (
  <div css={toggleStyle}>
    <label htmlFor="captionToggle">+</label>
    <input type="checkbox" id="captionToggle"/>
    <div>
      <span>Simon Cheng has been detained by mainland Chinese authorities, his girlfriend has said.</span>
      <span>&nbsp;</span>
      <span>Photograph: Simon Cheng</span>
    </div>
  </div>
)

export default HeaderImageCaption;
