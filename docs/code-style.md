# Code style

## JavaScript

We use [ESlint](https://eslint.org/) and [Prettier](https://prettier.io/) to enforce our JavaScript code style. 
Running `make fix` after making any changes will fix most things.

There are some styles the linter can't pick up. If you are unsure of anything, [AirBnB's style
guide](https://github.com/airbnb/javascript) is a good place to look.

## Components

We use [React](https://reactjs.org/) for our components, and [Emotion](https://emotion.sh/) for our CSS in JS.

### Use Emotion's [`css`](https://emotion.sh/docs/css) function to build a class name from styles

> Why? It decouples our CSS declaration from specific components

```js
// bad
const MyComponent = styled('div')`
    color: red;
`;
render(
    <MyComponent />
);

// bad
render(
    <div css={`
        color: red;
    `} />
);

// good
const myComponent = css`
    color: red;
`;
render(
    <div className={myComponent} />
);
```

### Extract CSS into a variable rather than defining it inline in a component

> Why? It keeps the JSX tidy

```js
// bad
render(
    <div className={css`
        color: red;
    `} />
)

// good
const myComponent = css`
    color: red;
`;
render(
    <div className={myComponent} />
);
```

### Extract dynamic styles into a function that takes `props`

> Why? It avoids defining styles inline in a component, so keeps the JSX tidy

```js
// bad
const MyComponent = ({ fontColor }) =>
    <div className={css`
        color: ${fontColor};
    `} />;

// good
const myComponent = (fontColor) => css`
    color: ${fontColor};
`;
const MyComponent = ({ fontColor }) =>
    <div className={myComponent(fontColor)} />;
```

### Define CSS using template literals rather than objects

> Why? The CSS looks more like CSS, more people will be familiar with the syntax

```js
// bad
const myComponent = css({
    backgroundColor: 'hotpink',
});

// good
const myComponent = css`
    background-color: hotpink;
`;
```

### Never define styles with more than one level of nesting

> Why? Excessive nesting is bad for performance and the added specificity makes the CSS harder to work with

```js
// bad
const myList = css`
  li {
      a {
          color: fuchsia;
      }
  }
`;
render(
    <ul className={myList}>
        <li>
            <a href="#">Click me</a>
        </li>
    </ul>
);

// good
const myLink = css`
    color: fuchsia;
`;
render(
    <ul>
        <li>
            <a className={myLink} href="#">Click me</a>
        </li>
    </ul>
);
```
