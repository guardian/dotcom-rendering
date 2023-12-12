# Code style

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- Automatically created by running `pnpm createtoc` in a pre-commit hook -->

-   [TypeScript](#typescript)
    -   [Always used named exports](#always-used-named-exports)
    -   [Never name a file `index.ts` or `index.tsx`](#never-name-a-file-indexts-or-indextsx)
-   [Components](#components)
    -   [Use Emotion's `css` function to build a class name from styles](#use-emotions-css-function-to-build-a-class-name-from-styles)
    -   [Extract CSS into a variable rather than defining it inline in a component](#extract-css-into-a-variable-rather-than-defining-it-inline-in-a-component)
    -   [Extract dynamic styles into a function that takes `props`](#extract-dynamic-styles-into-a-function-that-takes-props)
    -   [Define CSS using template literals rather than objects](#define-css-using-template-literals-rather-than-objects)
    -   [Never define styles with more than one level of nesting](#never-define-styles-with-more-than-one-level-of-nesting)
    -   [Prefer `cx` for style composition](#prefer-cx-for-style-composition)
    -   [Do not use React.FC or equivalent](#do-not-use-reactfc-or-equivalent)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## TypeScript

We use ESlint and [Prettier](https://prettier.io/) to enforce our TypeScript code style.
Running `make fix` after making any changes will fix most things.

There are some styles the linter can't pick up. If you are unsure of anything, [Excel Micro's fork of AirBnB's style
guide](https://github.com/excelmicro/typescript) is a good place to look.

### Always used named exports

> Why? For components, a default export will show as `<Unknown>` in the React dev tools unless explicity declared to a constant first. Also, default exports can lead to confusing situations. (Using the name of the export as a local variable in the file, exporting named and a default)

```js
// bad
// MyComponent.tsx
export default () => <h1>My component</h1>;

//Parent.tsx
import MyComponent from './MyComponent';
```

```js
// good
// MyComponent.tsx
export const MyComponent = () => <h1>MyComponent</h1>;

// Parent.tsx
import { MyComponent } from './MyComponent';
```

### Never name a file `index.ts` or `index.tsx`

> Why? There is a common Node.js idiom to give the name `index` to the module at the entry point to a directory. This leads to an abundance of files named `index.ts*`, which makes it
> harder to find a file in the IDE. When editing a number of files called `index.ts*` in an IDE, it is hard to see at a glance which one is which.

```js
// bad
// Parent/index.tsx
import Child from '../Child';
```

```js
// good
// Parent/Parent.tsx
import Child from '../Child/Child';
```

## Components

We use [React](https://reactjs.org/) for our components, and [Emotion](https://emotion.sh/) for our CSS in JS.

### Use Emotion's [`css`](https://emotion.sh/docs/@emotion/css#css) function to build a class name from styles

> Why? It decouples our CSS declaration from specific components

```js
// bad
const MyComponent = styled('div')`
	color: red;
`;
render(<MyComponent />);

// bad
render(
	<div
		css={`
			color: red;
		`}
	/>,
);

// good
const myComponent = css`
	color: red;
`;
render(<div className={myComponent} />);
```

### Extract CSS into a variable rather than defining it inline in a component

> Why? It keeps the JSX tidy

```js
// bad
render(
	<div
		className={css`
			color: red;
		`}
	/>,
);

// good
const myComponent = css`
	color: red;
`;
render(<div className={myComponent} />);
```

### Extract dynamic styles into a function that takes `props`

> Why? It avoids defining styles inline in a component, so keeps the JSX tidy

```js
// bad
const MyComponent = ({ fontColor }) => (
	<div
		className={css`
			color: ${fontColor};
		`}
	/>
);

// good
const myComponent = (fontColor) => css`
	color: ${fontColor};
`;
const MyComponent = ({ fontColor }) => (
	<div className={myComponent(fontColor)} />
);
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
	</ul>,
);

// good
const myLink = css`
	color: fuchsia;
`;
render(
	<ul>
		<li>
			<a className={myLink} href="#">
				Click me
			</a>
		</li>
	</ul>,
);
```

### Prefer [`cx`](https://emotion.sh/docs/@emotion/css#cx) for style composition

> Why? `cx` composes given CSS in the most performant way in [_most_ cases](https://github.com/guardian/dotcom-rendering/pull/126#discussion_r209999843). It is more likely to reduce duplication of output CSS. It is also more readable, avoiding tricky syntax such as nested ternaries. However, there are cases in which it is more performant to use [`classNames`](https://github.com/JedWatson/classnames), notably if there are a large number of elements of a particular Component that use different combinations of classes.

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
const MyLink = ({ isActive }) => (
	<a className={isActive ? activeLink : link}>Click me</a>
);

// good
const link = css`
	color: blue;
	font-weight: 700;
`;
const activeLink = css`
	color: red;
`;
const MyLink = ({ isActive }) => (
	<a className={cx({ [activeLink]: isActive }, link)}>Click Me</a>
);
```

### Do not use React.FC or equivalent
