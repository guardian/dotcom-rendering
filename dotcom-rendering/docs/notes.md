# Wants

-   One button to get computed values?
-   data attributes to layout files’ `main` tag @mxdvl
-   annotate islands

```css
gu-island::before {
    content: attr(name);
}

figure::before {
    content: attr(data-spacefinder-type);
}
```
