# Support NoJS for Top Nav while maintaining accessibility

## Context

Top Nav was intended to support NoJS, however the previous implementation did not work.
As a team we thought that getting NoJS to would would yield 2 major performance wins:

-   reduce the size of the `window.guardian.app.NAV`
    -   less data being sent down to the client
    -   less data for the client to parse
-   remove the need for client side hydration
    -   freeing up the main thread

Removing Top Nav data from `window.guardian.app.NAV` resulted in a reduction ~20kb (stringified).

### How NoJS support achieved?

We used the CSS `~` selector. This allows us to apply css to elements that precede a checkbox.
As we can use `:checked` as a CSS selector, we can chain that with `~` to apply styles
to DOM elements that are preceded from that element.

This allows us to create a checkbox that can be used as a drop down toggle without JS.

In our case we have 2 components that are used to toggle the Top Nav Menu:

-   Veggie Burger
-   Show More Menu

In order for both of these elements to toggle the same checkbox we use an HTML `label` tag
and apply the prop `htmlFor`. `htmlFor` allows all clicks registered to that label to
apply to the input that is specified by its prop.

Here is a simple implementation of how this logic works:

ex:

```
<input type="checkbox" id="someCheckbox" />
<h1>Hello World</h1>

#someCheckbox:checked ~ h1 {
  color: red;
}
```

If the target element is nested you then need to explicitly state the path
ex:

```
<input type="checkbox" id="someCheckbox" />
<div>
  <h1>Hello World</h1>
</div>

#someCheckbox:checked ~ div h1 {
  color: red;
}
```

It is also important to note that this only works for DOM elements that `preceded` the input
ex:

```
// NOTE: This will NOT work
<div>
  <h1>Hello World</h1>
</div>
<input type="checkbox" id="someCheckbox" />

#someCheckbox:checked ~ div h1 {
  color: red;
}
```

### drawbacks to this approach

-   Elements that depend on the input checkbox are not explicitly linked
    If someone changes the structure by adding a `div` wrapper, they could break the style.
    To mitigate this we have added integration tests to test the functionality of these elements.

-   Accessibility
    Accessibility for dialogs is hard, and also when you step out of semantic HTML you end up
    having to do a lot of the heavy lifting of making things accessible using JS.

### How do you maintain accessibility with NoJS?

We made a compromise, getting accessibility to work for this case was too hard without JS.
We therefore used `dangerouslySetInnerHTML` into a `script` tag and added vanilla JS to help us apply basic accessibility features. This allowed us to keep SSR the NAV and not need to
hydrate the app while still having some JS logic.

### What are the drawbacks?

Inserting `dangerouslySetInnerHTML` JS into a `script` is not an ideal solution. We loose
the capability of unit testing, type checking, linting, minifying our JS and furthermore
are now are running JS outside of react.

We could bundle this code separately to the rest of the app to allow us to still leverage
type checking, linting, minifying. We have also started implementing accessibility
integration tests using Cypress. However the current drawbacks of this approach:

-   Loose the link between the Nav component and logix (as the JS file needs to be imported server side)
-   We want this approach to be used sparingly

We are still exploring improvements that could be made in this area.

## Can this NoJS approach be used elsewhere to remove client side hydration?

Yes, there are several areas where we could use this CSS trick to remove
the need for JS and thus remove client side hydration. We are keen to study
the impact this PR has on performance to see if it justifies its implementation
elsewhere.

## Status

Approved

...
