# Switch pattern for Display and Design
Every article has a `Display` and a `designType`. These describe the type of article and how it should be laid out on the page. We use these values to make choices about how to style and position elements. They are prop drilled into most components.

To prevent confusing, hard to maintain code, the switch pattern isused when branching based on `Display` and / or `designType`. If branching on both, a nested switch is used. This pattern is intended to be both easy to read and something that will scale well.

Example usage of switch pattern

```
const shouldShowAvatar = (designType: DesignType, display: Display) => {
    switch (display) {
        case 'immersive':
            return false;
        case 'showcase':
        case 'standard': {
            switch (designType) {
                case 'Feature':
                case 'Review':
                case 'Recipe':
                case 'Interview':
                    return true;
                case 'Live':
                case 'Media':
                case 'PhotoEssay':
                case 'Analysis':
                case 'Article':
                case 'MatchReport':
                case 'GuardianView':
                case 'GuardianLabs':
                case 'Quiz':
                case 'AdvertisementFeature':
                case 'Comment':
                default:
                    return false;
            }
        }
    }
};
```