function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/* eslint-disable camelcase */

// bespoke wrapper around preact's `h` that passes any CSS data
// on `attributes.style` to styletron, then hands off to `preact#h`

import { h as preact_h } from 'preact';
import { styled } from 'styletron-preact';
import { css } from 'emotion';

export default ((component, attributes, ...children) => {
    const _ref = attributes || {},
          { style = {} } = _ref,
          otherAttributes = _objectWithoutProperties(_ref, ['style']);

    // cheapCSS and expensiveCSS are added by __tools__/ui-css-loader.js
    // after it analyses the CSS that's being loaded
    const { cheapCSS, expensiveCSS: emotionCSS } = style,
          inlineStyles = _objectWithoutProperties(style, ['cheapCSS', 'expensiveCSS']);

    // if the style prop has been used normally, use those styles too
    // overriding what was imported cascade-style
    const styletronCSS = Object.assign({}, cheapCSS, inlineStyles);

    if (emotionCSS && Object.keys(emotionCSS).length) {
        otherAttributes.className = [css(emotionCSS), otherAttributes.className].join(' ').trim();
    }

    return preact_h(Object.keys(styletronCSS).length ? styled(component, styletronCSS) : component, otherAttributes, children);
});
