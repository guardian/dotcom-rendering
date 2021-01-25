# Switch pattern for Display and Design
Every article has a `Display` and a `designType`. These describe the type of article and how it should be laid out on the page. We use these values to make choices about how to style and position elements. They are prop drilled into most components.

To prevent confusing, hard to maintain code, the switch pattern isused when branching based on `Display` and / or `designType`. If branching on both, a nested switch is used. This pattern is intended to be both easy to read and something that will scale well.

Example usage of switch pattern

```
const shouldShowAvatar = (design: Design, display: Display) => {
    switch (display) {
        case 'immersive':
            return false;
        case 'showcase':
        case 'standard': {
            switch (design) {
                case Design.Feature:
                case Design.Review:
                case Design.Recipe:
                case Design.Interview:
                    return true;
                default:
                    return false;
            }
        }
    }
};
```