# Pasteup

The Guardian Design Tokens are intended to be used in conjunction with a CSS-in-JS library such as [Emotion](https://emotion.sh). 

**Under construction 🚧**

This file documents the current version of Pasteup, and the dotcom-rendering use of it, but note that this package is still under heavy construction.

## Motivation

[Media queries](https://en.wikipedia.org/wiki/Media_queries) allow for the the specification of CSS against changing configuration (for instance, screen sizes or screen resolutions). 

For instance the following declaration would set the `body`'s background colour to `lightblue` if the viewport is less than 600px wide

```css
@media only screen and (max-width: 600px) {
  body {
    background-color: lightblue;
  }
}
```

The logic of media queries is that they allow you to (re)define your CSS given a condition, but there is sometimes a need to start from a selector and then define the various CSS attributes at different configurations. This is possible with tools like [sass-mq](https://raw.githubusercontent.com/sass-mq/sass-mq/master/README.md). The following declaration

```scss
$mq-breakpoints: (
    mobile:  320px,
    tablet:  740px,
    desktop: 980px,
    wide:    1300px
);

@import 'mq';

.foo {
    @include mq($from: mobile, $until: tablet) {
        background: red;
    }
    @include mq($from: tablet) {
        background: green;
    }
}
```

which defines what happens to the `.foo` selector at different screen sizes, has both the virtue to use variables and be easier to read, and is compiled to 

```
@media (min-width: 20em) and (max-width: 46.24em) {
  .foo {
    background: red;
  }
}
@media (min-width: 46.25em) {
  .foo {
    background: green;
  }
}
```

Unfortunately, sass-mq is not compatible with our use of CSS-in-JS and this is where Pasteup comes in.

With Pasteup we can write, for instance

```
const wrapper = css`
    
    padding-top: 6px;
    margin-right: 0;
    margin-left: 0;
    
    ${desktop} {
        max-width: 620px;
        margin-right: 310px;
        padding-left: 10px;
    }
    
    (...)
`   
```

which with `desktop` defined as 

```
@media (min-width: 980px)
```

Means that the attached css instructions will be active when the screen size is greater than 980px.



## Usage

This section gives examples of the current usage of Pasteup

### Breakpoints

#### Examples

```js
import {
    desktop
} from '@guardian/pasteup/breakpoints';

const wrapper = css`
    
    padding-top: 6px;
    margin-right: 0;
    margin-left: 0;
    
    ${desktop} {
        max-width: 620px;
        margin-right: 310px;
        padding-left: 10px;
    }
    
    (...)
`

const bodyStyle = css`
    ${from.tablet.until.desktop} {
        padding-right: 80px;
    }
	(...)
`

```

Where `desktop` is defined as 

```
@media (min-width: 980px)
```

And `from.tablet.until.desktop` is defined as 

```
@media (min-width: 740px) and (max-width: 979px)
```

#### Logic

The starting point is the base mapping (breakpoints)

```
export const breakpoints = {
    mobile: 320,
    mobileMedium: 360,
    mobileLandscape: 480,
    phablet: 660,
    tablet: 740,
    desktop: 980,
    leftCol: 1140,
    wide: 1300,
};
```

1. We then have the constants `mobile`, `mobileMedium`, `mobileLandscape`, `phablet`, `tablet`, `desktop`, `leftCol`, `wide`. Where, for instance, `mobile` means 

	```
	@media (min-width: 980px)
	```
1. We have the constants `until.mobile`, `until.maxWidth`, `until.mobileMedium`, `until.mobileLandscape`, `until.phablet`, `until.tablet`, `until.desktop`, `until.leftCol`, `until.wide`. Where, for instance, `until.desktop` means 
	```
	@media (max-width: 979px)
	```
1. We have constants such as `from.tablet.until.desktop` (and the derivatives, for instance, `from.[symbol1].until.[symbol2]`, where symbol ranges over the constants in subsection 1), which means 
	```
	@media (min-width: 740px) and (max-width: 979px)
	```

### Fonts

```js
import { sans } from '@guardian/pasteup/fonts';

const footer = css`
    background-color: ${palette.brand.blue};
    color: ${palette.neutral[86]};
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
    text-decoration: none;
    padding-bottom: 12px;
    display: block;

    :hover {
        color: ${palette.highlight.main};
    }
`;

```

## Install (In progress, untested)

To install `pastup` run

```bash
$ npm install @guardian/pasteup
```

or

```bash
$ yarn add @guardian/pasteup
```

## Contribute (In progress, untested)

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