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

> Why? The CSS looks more like CSS, more people will be familiar with the syntax. For instance, we can use traditional `kebab-case` CSS property names. We can copy and paste CSS from a CSS file or our browser's dev tools directly into our JS file. We don't have to wrap all values in quotes. Additionally, JS objects afford developers a lot of power in how they are constructed and manipulated that can make the CSS harder to understand.

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

### Prefer [`cx`](https://emotion.sh/docs/cx) for style composition

> Why? `cx` composes given CSS in the most performant way in _most_ cases. It is more likely to reduce duplication of output CSS. It is also more readable, avoiding tricky syntax such as nested ternaries. However, there are cases in which it is more performant to use [`classNames`](https://github.com/JedWatson/classnames), notably if there are a large number of elements of a particular Component that use different combinations of classes.

```js
// bad
const link = css`
    color: blue;
    font-weight: 700;
`;
const activeLink = css`
    ${link};
    color: red;
`;
const MyLink = ({ isActive }) =>
    <a className={isActive ? activeLink : link}>Click me</a>;

// good
const link = css`
    color: blue;
    font-weight: 700;
`;
const activeLink = css`
    color: red;
`;
const MyLink = ({ isActive }) =>
    <a className={cx({
        activeLink: isActive,
        link: true
    )}}>Click Me</a>;

```