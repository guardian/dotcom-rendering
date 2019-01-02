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
import { sans } from '@guardian/pasteup/typography';

const footer = css`
    font-family: ${sans.body};
    font-size: 16px;
    margin-top: 20px;
`;
```

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
