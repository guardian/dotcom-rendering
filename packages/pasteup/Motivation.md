
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
