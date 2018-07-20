# Pasteup

Guardian design tokens. These tokens are intended to be used in conjunction with a CSS-in-JS library
such as [Emotion](https://emotion.sh).

**Alpha package - under construction 🚧**

This package is still under heavy construction, please do not install this in applications intended for
use in production. The API may change significantly before it is out of alpha. If you enjoy working on shifting sands and wish to use this package in your application, please talk to the Platform team, or email dotcom.platform.

## Install

```bash
$ npm install @guardian/pasteup
```

```bash
$ yarn add @guardian/pasteup
```

## Usage

### Breakpoints

```js
import {
    mobile,
    from
} from '@guardian/pasteup/breakpoints'

const MyComponent = styled('div')({
    [mobile]: {
        width: '150px',
    },
    [from.mobileMedium.until.tablet]: {
        width: '175px',
    },
    [from.tablet.until.desktop]: {
        width: '224px',
    },
    [from.desktop.until.leftCol]: {
        width: '249px',
    },
})
```

### Fonts

```js
import { headline } from '@guardian/pasteup/fonts'

const MyComponent = styled('div')({
    fontFamily: headline,
})
```

### Mixins

```js
import { screenReaderOnly } from '@guardian/pasteup/mixins'

const ScreenReaderText = styled('span')(screenReaderOnly)
```

### Palette

```js
import palette from '@guardian/pasteup/palette'

const MyComponent = styled('div')({
    color: palette.neutral.header,
    backgroundColor: palette.neutral['1'],
})
```

## Contribute

### Publish

From the root directory of the `dotcom-rendering` project, run:

```bash
$ make publish-pasteup
```

Note: if publishing fails, the pasteup directory will be left in a strange state. To correct this,
manually run:

```bash
$ make post-publish-pasteup
```
