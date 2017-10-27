// @flow
/* eslint-disable camelcase */

// bespoke wrapper around preact's `h` that passes any CSS data
// on `attributes.style` to styletron, then hands off to `preact#h`

import { h as preact_h } from 'preact';
import { css } from 'emotion';

export default (
    component: string,
    attributes: ?Object,
    ...children: Array<any>
): React.Element<any> => {
    const { style = {}, ...otherAttributes } = attributes || {};

    if (Object.keys(style).length) {
        otherAttributes.className = [css(style), otherAttributes.className]
            .join(' ')
            .trim();
    }

    return preact_h(component, otherAttributes, children);
};
