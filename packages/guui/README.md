# Guui

A set of guardian-styled components and helpers

**Alpha package - under construction 🚧**

This package is still under heavy construction, please do not install this in applications intended for
use in production. The API may change significantly before it is out of alpha. If you enjoy working on shifting sands and wish to use this package in your application, please talk to the Platform team, or email dotcom.platform.

## Install

```bash
$ npm install @guardian/guui
```

```bash
$ yarn add @guardian/guui
```

## Usage

### Creating components

GUUI components are [REACT](https://www.google.com) components that use [EMOTION](https://emotion.sh/docs/introduction) for writing their associated styles in JavaScript (css-in-js).

##### React

When creating a component module you must ensure `React` is available in your module. Why? because the JSX a component such as:

```js
<Headline/>
```

Will be transpiled to:

```js
React.createElement(Headline)
```

How to do this?

Option 1: You can import your own `React` dependency.

```js
import React from 'react'
```

Option 2: You can import the version of `React` used by `guui`.

```js
import { React } from '@guardian/guui';
```

Option 3: Automatically load `React` instead of having to import or require iy everywhere.

```js
plugins: [
    new webpack.ProvidePlugin({
        React: 'react'
    })
]
```

#### Stateless component

```js
import { React } from '@guardian/guui';

export default ({ headline }) => (
    <h1>headline</h1>
);
```

#### Stateful component

```js
import { React, Component } from '@guardian/guui';

export default class Headline extends Component {
    constructor(props: Props) {
        super(props);
    }

    render({ headline }) {
        return (
            <h1>headline</h1>
        );
    }
};
```

### Styling components

https://emotion.sh/docs/introduction


#### React
#### hydrateApp
#### renderToString
#### hydrateCSS
#### styled
#### Component

## Contribute

### Publish

From the root directory of the `dotcom-rendering` project, run:

```bash
$ make publish-guui
```

Note: if publishing fails, the guui directory will be left in a strange state. To correct this,
manually run:

```bash
$ make post-publish-guui
```