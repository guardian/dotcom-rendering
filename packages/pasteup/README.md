# Pasteup

The Guardian Design Tokens are intended to be used in conjunction with a CSS-in-JS library such as [Emotion](https://emotion.sh). 

**Under construction 🚧**

This file documents the current version of Pasteup. This package is still under heavy construction, please do not install this in applications intended for use in production. The API may change significantly before it is out of alpha. 

## Motivation

For an introduction to the origins of Pasteup, see [Motivation](Motivation.md).


## Usage

This section gives examples of the current usage of Pasteup

### Breakpoints

#### Example

```js
import {
    desktop
} from '@guardian/pasteup/breakpoints';

const wrapper = css`
    ${desktop} {
        max-width: 620px;
        margin-right: 310px;
        padding-left: 10px;
    }
`
```

Where `desktop` will be replaced by

```
@media (min-width: 980px)
```

#### Reference

The starting point is the base mapping (breakpoints)

| name            |  size  |
|:----------------|-------:|
| mobile          |  320px |
| mobileMedium    |  360px |
| mobileLandscape |  480px |
| phablet         |  660px |
| tablet          |  740px |
| desktop         |  980px |
| leftCol         | 1140px |
| wide            | 1300px |

The API exposes the following values:

1. `mobile`, `mobileMedium`, `mobileLandscape`, `phablet`, `tablet`, `desktop`, `leftCol` and `wide`. For instance, `mobile` is replaced by

	```
	@media (min-width: 980px)
	```

1. `until.[symbol]`, where `symbol` ranges over the constants in subsection 1). For instance, `until.desktop` is replace by

	```
	@media (max-width: 979px)
	```

1. `from.[symbol1].until.[symbol2]`, where `symbol` ranges over the constants in subsection 1). For instance, `from.tablet.until.desktop` is replaced by

	```
	@media (min-width: 740px) and (max-width: 979px)
	```

### Fonts

```js
import { textSans } from '@guardian/pasteup/typography';

const footer = css`
    ${textSans(6)}
    margin-top: 20px;
`;
```

Note the use of the function `textSans` imported from `typography`.

`typography` exposes three functions: `headline`, `body` and `textSans`, all taking a number/integer and returning a CSS string. For instance

```
textSans(2) =
font-size: 13px; line-height: 18px; font-family: GuardianTextSans, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif
```
The current mapping is hardcoded in the code of `typography` and is:

```
const fontScaleMapping: any = {
    headline: {
        1: { fontSize: 14, lineHeight: 18 },
        2: { fontSize: 16, lineHeight: 20 },
        3: { fontSize: 20, lineHeight: 24 },
        4: { fontSize: 24, lineHeight: 28 },
        5: { fontSize: 28, lineHeight: 32 },
        6: { fontSize: 32, lineHeight: 36 },
        7: { fontSize: 36, lineHeight: 40 },
        8: { fontSize: 40, lineHeight: 44 },
        9: { fontSize: 44, lineHeight: 48 },
    },
    body: {
        1: { fontSize: 14, lineHeight: 20 },
        2: { fontSize: 16, lineHeight: 24 },
        3: { fontSize: 18, lineHeight: 28 },
    },
    textSans: {
        1: { fontSize: 12, lineHeight: 16 },
        2: { fontSize: 13, lineHeight: 18 },
        3: { fontSize: 14, lineHeight: 20 },
        4: { fontSize: 14, lineHeight: 22 },
        5: { fontSize: 16, lineHeight: 22 },
        6: { fontSize: 18, lineHeight: 18 },
        7: { fontSize: 20, lineHeight: 20 },
    },
};

// together with

serif.headline: GH Guardian Headline, Georgia, serif
serif.body: GuardianTextEgyptian, Georgia, serif
sans.body: GuardianTextSans, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif

```

This mapping may see adjustements in the future.


### Mixins

```js
import { screenReaderOnly } from '@guardian/pasteup/mixins';

css`
    ${screenReaderOnly};
`
```

### Palette

```js
import { palette } from '@guardian/pasteup/palette';

const footerLink = css`
    color: ${palette.neutral[100]};
    :hover {
        color: ${palette.highlight.main};
    }
`;

```
