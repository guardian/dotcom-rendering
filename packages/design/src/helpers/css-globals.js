import { palette } from '@guardian/pasteup/palette';
import { injectGlobal } from 'emotion';

/*
Given the pasteup palette,
this function flattens all colours into a
child free map where the keys are named as
parent-child.
*/
const flatten = (obj, prefixes = []) =>
    Object.entries(obj).reduce(
        (prev, [key, val]) =>
            typeof val === 'string'
                ? {
                      ...prev,
                      [[...prefixes, key].join('-')]: val,
                  }
                : {
                      ...prev,
                      ...flatten(val, [...prefixes, key]),
                  },
        {},
    );

const paletteAsMap = () => flatten(palette);

export const inject = () =>
    injectGlobal`
      :root {
        ${Object.entries(paletteAsMap()).map(
            ([key, val]) => `--${key}:${val};`,
        )}
      }
  `;
